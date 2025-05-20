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
    if (!validateForm()) return;
    try {
      const res = await fetch(api_url+'/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Failed to submit');
        return;
      }
      toast.success(data.message || 'Submitted successfully!');
      setForm({ name: '', email: '', age: '', gender: '', feedback: '' });
    } catch (error) {
      toast.error('An error occurred while submitting.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white/95 shadow-2xl rounded-2xl p-10 w-full max-w-md border border-blue-100">
      <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8 drop-shadow">
        Submit Feedback
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
          className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-2 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;