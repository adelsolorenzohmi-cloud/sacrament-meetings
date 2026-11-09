export default function MeetingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Ward Meetings</h2>
                <p className="text-sm text-gray-500 mt-1">View upcoming sacrament meeting programs and historical records.</p>
            </div>
            {children}
        </div>
    );
}