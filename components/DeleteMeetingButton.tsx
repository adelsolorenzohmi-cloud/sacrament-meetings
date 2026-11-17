'use client';

import { useFormStatus } from 'react-dom';

export default function DeleteMeetingButton({ meetingDate }: { meetingDate: string }) {
    // Must be rendered inside the <form> whose action it reads
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            onClick={(event) => {
                if (!window.confirm(`Delete the meeting on ${meetingDate}? This cannot be undone.`)) {
                    event.preventDefault();
                }
            }}
            className="text-sm font-semibold text-red-700 hover:text-red-900 disabled:opacity-60"
        >
            {pending ? 'Deleting...' : 'Delete'}
            <span className="sr-only"> meeting on {meetingDate}</span>
        </button>
    );
}