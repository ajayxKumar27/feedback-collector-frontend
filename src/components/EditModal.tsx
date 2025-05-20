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
  loading: boolean;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EditModal: React.FC<EditModalProps> = ({
  show,
  editForm,
  onChange,
  onClose,
  onSubmit,
  loading
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
          {loading && (
        <>
          <div className="absolute inset-0 bg-gray-300 opacity-50 rounded-2xl z-10"></div>
          <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 grid place-items-center opacity-100 transition-all duration-300 ease-in-out z-11">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span className="text-center mt-4 pl-3">Loading...</span>
          </div>
        </>
      )}
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
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;