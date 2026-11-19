'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { MEETING_TYPES, type SacramentMeeting } from '@/lib/types';
import type { FieldName, State } from '@/lib/actions';

type MeetingFormProps = {
    action: (prevState: State, formData: FormData) => Promise<State>;
    meeting?: SacramentMeeting;
    submitLabel: string;
};

type FieldProps = {
    name: FieldName;
    label: string;
    kind?: 'text' | 'date' | 'number' | 'select' | 'textarea';
    defaultValue: string;
    errors?: string[];
    hint?: string;
    required?: boolean;
};

const initialState: State = { message: null, errors: {} };

const baseInput =
    'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600';

function getDefaults(meeting?: SacramentMeeting): Record<FieldName, string> {
    return {
        date: meeting?.date ?? '',
        meetingType: meeting?.meetingType ?? '',
        presiding: meeting?.presiding ?? '',
        conducting: meeting?.conducting ?? '',
        announcements: meeting?.announcements ?? '',
        openingHymn: meeting ? String(meeting.openingHymn) : '',
        openingPrayer: meeting?.openingPrayer ?? '',
        wardBusiness: meeting?.wardBusiness ?? '',
        stakeBusiness: meeting?.stakeBusiness ?? '',
        sacramentHymn: meeting ? String(meeting.sacramentHymn) : '',
        speakers: meeting?.speakers?.join('\n') ?? '',
        closingHymn: meeting ? String(meeting.closingHymn) : '',
        closingPrayer: meeting?.closingPrayer ?? '',
    };
}

function Field({
    name,
    label,
    kind = 'text',
    defaultValue,
    errors,
    hint,
    required = true,
}: FieldProps) {
    const errorId = `${name}-error`;
    const hintId = `${name}-hint`;
    const hasError = Boolean(errors && errors.length > 0);
    const describedBy = [hint ? hintId : null, errorId].filter(Boolean).join(' ');

    const common = {
        id: name,
        name,
        defaultValue,
        'aria-describedby': describedBy,
        'aria-invalid': hasError,
        'aria-required': required,
        className: `${baseInput} ${hasError ? 'border-red-600' : 'border-gray-300'}`,
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-900 mb-1">
                {label}
                {required ? (
                    <span aria-hidden="true" className="text-red-700"> *</span>
                ) : (
                    <span className="text-gray-600 font-normal"> (optional)</span>
                )}
            </label>

            {kind === 'select' ? (
                <select key={defaultValue} {...common}>
                    <option value="">Select a meeting type</option>
                    {MEETING_TYPES.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            ) : kind === 'textarea' ? (
                <textarea key={defaultValue} {...common} rows={4} />
            ) : (
                <input
                    key={defaultValue}
                    {...common}
                    type={kind}
                    min={kind === 'number' ? 1 : undefined}
                    max={kind === 'number' ? 1000 : undefined}
                    inputMode={kind === 'number' ? 'numeric' : undefined}
                />
            )}

            {hint && (
                <p id={hintId} className="mt-1 text-xs text-gray-600">
                    {hint}
                </p>
            )}

            {/* Always rendered so screen readers announce changes inside it */}
            <div id={errorId} aria-live="polite" className="mt-1">
                {errors?.map((error) => (
                    <p key={error} className="text-sm text-red-700">
                        {error}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default function MeetingForm({ action, meeting, submitLabel }: MeetingFormProps) {
    const [state, formAction, isPending] = useActionState(action, initialState);

    // After a failed submit, show what the user typed (React resets the form)
    const values = state.values ?? getDefaults(meeting);
    const errors = state.errors ?? {};

    return (
        // noValidate so the server-side Zod messages are shown, not browser ones
        <form action={formAction} noValidate className="space-y-8">
            <div aria-live="polite">
                {state.message && (
                    <p className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                        {state.message}
                    </p>
                )}
            </div>

            <p className="text-sm text-gray-600">Fields marked with * are required.</p>

            <fieldset className="space-y-4">
                <legend className="text-lg font-semibold text-gray-900 mb-2">Meeting details</legend>
                <Field name="date" label="Date" kind="date" defaultValue={values.date} errors={errors.date} />
                <Field name="meetingType" label="Meeting type" kind="select" defaultValue={values.meetingType} errors={errors.meetingType} />
                <Field name="presiding" label="Presiding" defaultValue={values.presiding} errors={errors.presiding} />
                <Field name="conducting" label="Conducting" defaultValue={values.conducting} errors={errors.conducting} />
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="text-lg font-semibold text-gray-900 mb-2">Program</legend>
                <Field name="openingHymn" label="Opening hymn number" kind="number" defaultValue={values.openingHymn} errors={errors.openingHymn} />
                <Field name="openingPrayer" label="Opening prayer" defaultValue={values.openingPrayer} errors={errors.openingPrayer} />
                <Field name="sacramentHymn" label="Sacrament hymn number" kind="number" defaultValue={values.sacramentHymn} errors={errors.sacramentHymn} />
                <Field
                    name="speakers"
                    label="Speakers"
                    kind="textarea"
                    required={false}
                    hint="Enter one name per line (maximum 10)."
                    defaultValue={values.speakers}
                    errors={errors.speakers}
                />
                <Field name="closingHymn" label="Closing hymn number" kind="number" defaultValue={values.closingHymn} errors={errors.closingHymn} />
                <Field name="closingPrayer" label="Closing prayer" defaultValue={values.closingPrayer} errors={errors.closingPrayer} />
            </fieldset>

            <fieldset className="space-y-4">
                <legend className="text-lg font-semibold text-gray-900 mb-2">Business and announcements</legend>
                <Field name="announcements" label="Announcements" kind="textarea" required={false} defaultValue={values.announcements} errors={errors.announcements} />
                <Field name="wardBusiness" label="Ward business" kind="textarea" required={false} defaultValue={values.wardBusiness} errors={errors.wardBusiness} />
                <Field name="stakeBusiness" label="Stake business" kind="textarea" required={false} defaultValue={values.stakeBusiness} errors={errors.stakeBusiness} />
            </fieldset>

            <div className="flex items-center justify-end gap-3 border-t pt-6">
                <Link
                    href="/meetings"
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Saving...' : submitLabel}
                </button>
            </div>
        </form>
    );
}