'use client';
import { api_url } from '@/constants/constant';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';

interface FormState {
  name: string;
  email: string;
  age: string;
  gender: string;
  feedback: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HomePage: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', age: '', gender: '', feedback: '' });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!form.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (
      !form.age.trim() ||
      isNaN(Number(form.age)) ||
      Number(form.age) < 10 ||
      Number(form.age) > 100
    ) {
      toast.error('Age must be a number between 10 and 100');
      return false;
    }
    if (!form.gender) {
      toast.error('Gender is required');
      return false;
    }
    if (!form.feedback.trim() || form.feedback.length < 5) {
      toast.error('Feedback must be at least 5 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    if (!validateForm()) {setisLoading(false); return}
    try {
      const res = await fetch(api_url + '/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Failed to submit');
        setisLoading(false);
        return;
      }
      toast.success(data.message || 'Submitted successfully!');
      setisLoading(false);
      setForm({ name: '', email: '', age: '', gender: '', feedback: '' });
    } catch (error) {
      toast.error('An error occurred while submitting.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={`bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md border border-blue-100 mx-auto my-10 relative ${isLoading ? 'pointer-events-none' : ''}`}>
      {isLoading && (
        <>
          <div className="absolute inset-0 bg-gray-300 opacity-50 rounded-2xl z-10"></div>
          <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 grid place-items-center opacity-100 transition-all duration-300 ease-in-out z-11">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span className="text-center mt-4 pl-3">Loading...</span>
          </div>
        </>
      )}
      <div className="bg-grey-loader"></div>
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8 drop-shadow">
        Submit Feedback
      </h1>
      {!isLoading && (
        <div className="text-center mb-4">
          <p className="text-gray-500">Please fill out the form below:</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 ">

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="block w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition bg-white/80"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="block w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition bg-white/80"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="block w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition bg-white/80"
          required
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="block w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition bg-white/80"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <textarea
          name="feedback"
          placeholder="Feedback"
          value={form.feedback}
          onChange={handleChange}
          className="block w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none bg-white/80"
          rows={4}
          required
        />
        <button
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>

    </div>
  );
};

export default HomePage;