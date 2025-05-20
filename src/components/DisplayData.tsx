'use client';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import EditModal from './EditModal';
import { api_url } from '@/constants/constant';
import DataTable from './DataTable';

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
            const res = await fetch(api_url + '/api/forms');
            const entries = await res.json();
            setData(entries);
            setLoading(false);
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
                <DataTable
                    data={data}
                    loading={loading}
                    onEdit={openEditModal}
                    onDelete={deleteEntry}
                />
            </div>
            <EditModal
                show={showModal && !!editEntry}
                editForm={editForm}
                onChange={handleEditChange}
                onClose={() => setShowModal(false)}
                onSubmit={handleEditSubmit}
                loading={loading}
            />
        </>
    );
};

export default DisplayData;