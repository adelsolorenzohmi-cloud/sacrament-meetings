export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Ward Leadership Admin</h2>
                <p className="text-sm text-gray-500 mt-1">Manage sacrament meeting programs and schedules.</p>
            </div>
            {children}
        </div>
    );
}