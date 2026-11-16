import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
    const page = Number(url.searchParams.get('page')) || 1;
    const meetings = await getMeetings(query, page);
    return Response.json(meetings);
}