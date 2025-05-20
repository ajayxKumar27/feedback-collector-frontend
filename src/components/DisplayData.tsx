'use client';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import EditModal from './EditModal';
import { api_url } from '@/constants/constant';

interface Entry {
    id: string;
    name: string;
    email: string;
    age: string;
    gender: string;
    feedback: string;
}

const DisplayData: React.FC = () => {
    const [data, setData] = useState<Entry[]>([]);
    const [editEntry, setEditEntry] = useState<Entry | null>(null);
    const [editForm, setEditForm] = useState<Omit<Entry, 'id'>>({
        name: '',
        email: '',
        age: '',
        gender: '',
        feedback: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(api_url+'/api/forms');
            const entries = await res.json();
            setData(entries);
        } catch (error) {
            toast.error('Failed to fetch data');
        }
        setLoading(false);
    };

    const deleteEntry = async (id: string) => {
        setLoading(true);
        try {
            const res = await fetch(`${api_url}/api/forms/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Entry deleted successfully');
                fetchData();
            } else {
                toast.error('Failed to delete entry');
                setLoading(false);
            }
        } catch {
            toast.error('Failed to delete entry');
            setLoading(false);
        }
    };

    const openEditModal = (entry: Entry) => {
        setEditEntry(entry);
        setEditForm({
            name: entry.name,
            email: entry.email,
            age: entry.age,
            gender: entry.gender,
            feedback: entry.feedback,
        });
        setShowModal(true);
    };

    const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editEntry) return;
        setLoading(true);
        try {
            const res = await fetch(`${api_url}/api/forms/${editEntry.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm),
            });
            if (res.ok) {
                toast.success('Entry updated successfully');
                setShowModal(false);
                setEditEntry(null);
                fetchData();
            } else {
                toast.error('Failed to update entry');
                setLoading(false);
            }
        } catch {
            toast.error('Failed to update entry');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="bg-white/95 shadow-2xl rounded-2xl p-8 w-full sm:max-w-2/3 border border-blue-100 min-h-[400px] relative">
                <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8 drop-shadow">
                    Submitted Entries
                </h1>
                {loading ? (
                    <div className="flex justify-center items-center h-60">
                        <span className="inline-block w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border border-blue-200 rounded-lg overflow-hidden shadow">
                            <thead className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-left">
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Age</th>
                                    <th className="px-4 py-2">Gender</th>
                                    <th className="px-4 py-2">Feedback</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((entry) => (
                                    <tr key={entry.id} className="border-t hover:bg-blue-50 transition">
                                        <td className="px-4 py-2">{entry.name}</td>
                                        <td className="px-4 py-2">{entry.email}</td>
                                        <td className="px-4 py-2">{entry.age}</td>
                                        <td className="px-4 py-2">{entry.gender}</td>
                                        <td className="px-4 py-2">{entry.feedback}</td>
                                        <td className="px-4 py-2 flex gap-2">
                                            <button
                                                onClick={() => openEditModal(entry)}
                                                className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-3 py-1 rounded shadow hover:scale-105 transition cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteEntry(entry.id)}
                                                className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-3 py-1 rounded shadow hover:scale-105 transition cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {data.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-6 text-gray-400">
                                            No entries found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <EditModal
                show={showModal && !!editEntry}
                editForm={editForm}
                onChange={handleEditChange}
                onClose={() => setShowModal(false)}
                onSubmit={handleEditSubmit}
            />
        </>
    );
};

export default DisplayData;