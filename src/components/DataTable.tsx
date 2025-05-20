import React from 'react';

interface Entry {
    id: string;
    name: string;
    email: string;
    age: string;
    gender: string;
    feedback: string;
}

interface DataTableProps {
    data: Entry[];
    loading: boolean;
    onEdit: (entry: Entry) => void;
    onDelete: (id: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, loading, onEdit, onDelete }) => (
    <div className="relative overflow-x-auto" style={{ maxHeight: '60vh' }}>
        {loading ? (
            <div className="flex justify-center items-center h-60">
                <span className="inline-block w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
            </div>
        ) : (
            <table className="w-full text-sm text-left text-gray-700 bg-white rounded-xl shadow">
                <thead className="text-xs uppercase bg-gray-100 text-gray-700 sticky top-0 z-10">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-s-lg">Name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Age</th>
                        <th scope="col" className="px-6 py-3">Gender</th>
                        <th scope="col" className="px-6 py-3">Feedback</th>
                        <th scope="col" className="px-6 py-3 rounded-e-lg">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-10 text-2xl text-blue-400 font-semibold animate-pulse">
                                No entries found.
                            </td>
                        </tr>
                    ) : (
                        data.map((entry) => (
                            <tr key={entry.id} className="bg-white border-b hover:bg-blue-50 transition">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {entry.name}
                                </th>
                                <td className="px-6 py-4">{entry.email}</td>
                                <td className="px-6 py-4">{entry.age}</td>
                                <td className="px-6 py-4">{entry.gender}</td>
                                <td className="px-6 py-4 max-w-xs truncate">{entry.feedback}</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        onClick={() => onEdit(entry)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition font-semibold cursor-pointer"
                                        title="Edit Entry"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(entry.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition font-semibold cursor-pointer"
                                        title="Delete Entry"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        )}
    </div>
);

export default DataTable;