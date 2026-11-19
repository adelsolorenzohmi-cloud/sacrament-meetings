import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
    const rawPage = Number(url.searchParams.get('page'));
    const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

    try {
        const meetings = await getMeetings(query, page);
        return Response.json(meetings);
    } catch (error) {
        console.error('GET /api/meetings failed:', error);
        return Response.json({ error: 'Failed to load meetings.' }, { status: 500 });
    }
}