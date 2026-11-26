import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

export const metadata: Metadata = {
    title: 'Edit Meeting',
    description: 'Update an existing sacrament meeting program.',
};

export default async function EditMeetingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (!Number.isInteger(id) || id < 1 || id > 2147483647) {
        notFound();
    }

    const meeting = await getMeetingById(id);

    if (!meeting) {
        notFound();
    }

    const updateMeetingWithId = updateMeeting.bind(null, id);

    return (
        <div className="bg-white border rounded-xl shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Meeting</h1>
            <p className="text-gray-600 mb-8">
                Update the program for the meeting on {meeting.date}.
            </p>
            <MeetingForm
                action={updateMeetingWithId}
                meeting={meeting}
                submitLabel="Save Changes"
            />
        </div>
    );
}