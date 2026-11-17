import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (!Number.isInteger(id) || id < 1 || id > 2147483647) {
        return Response.json(
            { error: 'Invalid ID parameter (must be a positive whole number)' },
            { status: 400 }
        );
    }

    try {
        const meeting = await getMeetingById(id);

        if (!meeting) {
            return Response.json({ error: 'Meeting not found' }, { status: 404 });
        }

        return Response.json(meeting);
    } catch (error) {
        console.error('GET /api/meetings/[id] failed:', error);
        return Response.json({ error: 'Failed to load the meeting.' }, { status: 500 });
    }
}