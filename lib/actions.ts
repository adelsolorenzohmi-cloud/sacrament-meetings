'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    addMeeting,
    updateMeeting as updateMeetingInDb,
    deleteMeeting as deleteMeetingInDb,
} from '@/lib/meetings-db';
import { MEETING_TYPES, type SacramentMeeting } from '@/lib/types';

const FIELD_NAMES = [
    'date',
    'meetingType',
    'presiding',
    'conducting',
    'announcements',
    'openingHymn',
    'openingPrayer',
    'wardBusiness',
    'stakeBusiness',
    'sacramentHymn',
    'speakers',
    'closingHymn',
    'closingPrayer',
] as const;

export type FieldName = (typeof FIELD_NAMES)[number];

export type State = {
    message?: string | null;
    errors?: Partial<Record<FieldName, string[]>>;
    values?: Record<FieldName, string>;
};

function isRealDate(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    if (value < '1900-01-01' || value > '2100-12-31') return false;
    const date = new Date(`${value}T00:00:00Z`);
    return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === value
    );
}

const requiredText = (label: string, max: number) =>
    z
        .string()
        .trim()
        .min(1, `${label} is required.`)
        .max(max, `${label} must be ${max} characters or fewer.`);

const optionalText = (label: string, max: number) =>
    z
        .string()
        .trim()
        .max(max, `${label} must be ${max} characters or fewer.`)
        .transform((value) => (value === '' ? null : value));

const hymnNumber = (label: string) =>
    z.coerce
        .number({ error: `${label} must be a number between 1 and 1000.` })
        .int(`${label} must be a whole number.`)
        .min(1, `${label} must be a number between 1 and 1000.`)
        .max(1000, `${label} must be a number between 1 and 1000.`);

const MeetingFormSchema = z.object({
    date: z.string().refine(isRealDate, 'Please enter a valid date.'),
    meetingType: z.enum(MEETING_TYPES, {
        error: 'Please select a meeting type.',
    }),
    presiding: requiredText('Presiding', 100),
    conducting: requiredText('Conducting', 100),
    announcements: optionalText('Announcements', 1000),
    openingHymn: hymnNumber('Opening hymn'),
    openingPrayer: requiredText('Opening prayer', 100),
    wardBusiness: optionalText('Ward business', 1000),
    stakeBusiness: optionalText('Stake business', 1000),
    sacramentHymn: hymnNumber('Sacrament hymn'),
    speakers: z
        .string()
        .max(2000, 'The speakers list is too long.')
        .transform((value, ctx) => {
            const names = value
                .split(/\r?\n/)
                .map((name) => name.trim())
                .filter((name) => name.length > 0);

            if (names.length > 10) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Please list no more than 10 speakers.',
                });
                return z.NEVER;
            }
            if (names.some((name) => name.length > 100)) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Each speaker name must be 100 characters or fewer.',
                });
                return z.NEVER;
            }
            return names.length > 0 ? names : null;
        }),
    closingHymn: hymnNumber('Closing hymn'),
    closingPrayer: requiredText('Closing prayer', 100),
});

function readRawValues(formData: FormData): Record<FieldName, string> {
    return Object.fromEntries(
        FIELD_NAMES.map((name) => [name, String(formData.get(name) ?? '')])
    ) as Record<FieldName, string>;
}

function validationFailure(
    raw: Record<FieldName, string>,
    error: z.ZodError
): State {
    return {
        message: 'Please fix the errors below and try again.',
        errors: z.flattenError(error).fieldErrors as State['errors'],
        values: raw,
    };
}

export async function createMeeting(
    prevState: State,
    formData: FormData
): Promise<State> {
    const raw = readRawValues(formData);
    const parsed = MeetingFormSchema.safeParse(raw);

    if (!parsed.success) {
        return validationFailure(raw, parsed.error);
    }

    try {
        await addMeeting(parsed.data);
    } catch (error) {
        console.error('createMeeting failed:', error);
        throw new Error('Failed to create the meeting. Please try again.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function updateMeeting(
    id: number,
    prevState: State,
    formData: FormData
): Promise<State> {
    if (!Number.isInteger(id) || id < 1) {
        return { message: 'Invalid meeting ID.' };
    }

    const raw = readRawValues(formData);
    const parsed = MeetingFormSchema.safeParse(raw);

    if (!parsed.success) {
        return validationFailure(raw, parsed.error);
    }

    let updated: SacramentMeeting | null;
    try {
        updated = await updateMeetingInDb(id, parsed.data);
    } catch (error) {
        console.error('updateMeeting failed:', error);
        throw new Error('Failed to update the meeting. Please try again.');
    }

    if (!updated) {
        return {
            message: 'This meeting no longer exists, so it could not be updated.',
            values: raw,
        };
    }

    revalidatePath('/meetings');
    revalidatePath(`/meetings/${id}`);
    revalidatePath(`/meetings/${id}/edit`);
    redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
    if (!Number.isInteger(id) || id < 1) {
        throw new Error('Invalid meeting ID.');
    }

    try {
        await deleteMeetingInDb(id);
    } catch (error) {
        console.error('deleteMeeting failed:', error);
        throw new Error('Failed to delete the meeting. Please try again.');
    }

    revalidatePath('/meetings');
}