import React, { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

interface EditModalProps {
  show: boolean;
  editForm: {
    name: string;
    email: string;
    age: string;
    gender: string;
    feedback: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EditModal: React.FC<EditModalProps> = ({
  show,
  editForm,
  onChange,
  onClose,
  onSubmit,
}) => {
  const [submitting, setSubmitting] = useState(false);

  if (!show) return null;

  const validateForm = () => {
    if (!editForm.name.trim()) {
      toast.error('Name is required', { position: 'top-right' });
      return false;
    }
    if (!editForm.email.trim()) {
      toast.error('Email is required', { position: 'top-right' });
      return false;
    }
    if (!emailRegex.test(editForm.email)) {
      toast.error('Please enter a valid email address', { position: 'top-right' });
      return false;
    }
    if (
      !editForm.age.trim() ||
      isNaN(Number(editForm.age)) ||
      Number(editForm.age) < 10 ||
      Number(editForm.age) > 100
    ) {
      toast.error('Age must be a number between 10 and 100', { position: 'top-right' });
      return false;
    }
    if (!editForm.gender) {
      toast.error('Gender is required', { position: 'top-right' });
      return false;
    }
    if (!editForm.feedback.trim() || editForm.feedback.length < 5) {
      toast.error('Feedback must be at least 5 characters', { position: 'top-right' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    if (!validateForm()) return;
    setSubmitting(true);
    onSubmit(e);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border border-blue-200 relative">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-2xl cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={editForm.name}
            onChange={onChange}
            className="block w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            required
          />
          <input
            type="email"
            name="email"
            value={editForm.email}
            onChange={onChange}
            className="block w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            required
          />
          <input
            type="number"
            name="age"
            value={editForm.age}
            onChange={onChange}
            className="block w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            required
          />
          <select
            name="gender"
            value={editForm.gender}
            onChange={onChange}
            className="block w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <textarea
            name="feedback"
            value={editForm.feedback}
            onChange={onChange}
            className="block w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none"
            rows={3}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-2 rounded-lg shadow-lg transition hover:scale-105 cursor-pointer"
            disabled={submitting}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;