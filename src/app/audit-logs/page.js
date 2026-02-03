import React from 'react';
import LogTable from '@/components/AuditLogs/LogTable';
import { fetchauditLog } from "@/lib/strapi";

export const metadata = {
    title: "Audit Logs - PQ Investment",
    description: "Administrative access logs",
};

export default async function AuditLogPage() {
    const initialLogs = await fetchauditLog();
    console.log("Fetched Logs on Server:", initialLogs);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#800032]">Audit Logs Dashboard</h1>
                    <p className="text-gray-600 mt-2">Monitor system changes and administrative actions.</p>
                </div>

                <LogTable initialLogs={initialLogs || []} />
            </div>
        </div>
    );
}
