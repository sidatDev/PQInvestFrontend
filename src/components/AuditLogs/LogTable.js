"use client";
import React, { useState } from 'react';

export default function LogTable({ initialLogs = [] }) {
    const [logs] = useState(initialLogs);
    const [filterType, setFilterType] = useState('All');

    const [selectedLog, setSelectedLog] = useState(null);

    // Extract unique content types for filter dropdown
    const contentTypes = ['All', ...new Set(logs.map(log => log.contentType).filter(Boolean))];

    const filteredLogs = filterType === 'All'
        ? logs
        : logs.filter(log => log.contentType === filterType);

    // if (loading) return <div className="p-8 text-center">Loading Audit Logs...</div>;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {/* Header & Filter */}
            <div className="p-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                    Audit Logs ({filteredLogs.length})
                </h2>
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-600">Filter by Type:</label>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#800032]"
                    >
                        {contentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
                            <th className="p-4 font-semibold border-b">Date</th>
                            <th className="p-4 font-semibold border-b">Admin User</th>
                            <th className="p-4 font-semibold border-b">Action</th>
                            <th className="p-4 font-semibold border-b">Content Type</th>
                            <th className="p-4 font-semibold border-b">Item ID</th>
                            <th className="p-4 font-semibold border-b">Payload</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                        {filteredLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 whitespace-nowrap">
                                    {new Date(log.createdAt).toLocaleString()}
                                </td>
                                <td className="p-4 font-medium text-gray-900">
                                    {log.adminName || log.adminEmail || 'Unknown'}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                                        log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                                            log.action === 'DELETE' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-700'
                                        }`}>
                                        {log.action}
                                    </span>
                                </td>
                                <td className="p-4 font-mono text-xs text-gray-500">
                                    {log.contentType}
                                </td>
                                <td className="p-4 font-mono text-xs text-gray-400">
                                    {log.targetDocumentId || '-'}
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => setSelectedLog(log)}
                                        className="text-[#800032] hover:text-[#500020] text-xs font-semibold underline"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredLogs.length === 0 && (
                <div className="p-8 text-center text-gray-500 italic">
                    No logs found.
                </div>
            )}

            {/* Payload Modal */}
            {selectedLog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
                            <h3 className="font-bold text-gray-800">Payload Details</h3>
                            <button
                                onClick={() => setSelectedLog(null)}
                                className="text-gray-500 hover:text-gray-700 font-bold text-xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <div className="mb-4 text-sm text-gray-600">
                                <span className="font-semibold">Action:</span> {selectedLog.action} on {selectedLog.contentType} (ID: {selectedLog.targetDocumentId})
                            </div>
                            <pre className="bg-gray-800 text-green-400 p-4 rounded text-xs overflow-x-auto whitespace-pre-wrap">
                                {JSON.stringify(selectedLog.payload, null, 2)}
                            </pre>
                        </div>
                        <div className="p-4 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={() => setSelectedLog(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
