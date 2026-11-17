import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {

    await connection();

    const [latest] = await getMeetings('', 1);

    if (!latest) {
        redirect('/meetings');
    }

    redirect(`/meetings/${latest.id}`);
}