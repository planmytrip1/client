'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRegisterMutation } from '@/store/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/features/auth/authSlice';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [register, { isLoading }] = useRegisterMutation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      const userData = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(userData));
      router.push('/');
    } catch (err: any) {
      setError(err.data?.message || 'Registration failed. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4 py-12">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary-600">Create an Account</h2>
          <p className="text-gray-600 mt-1">
            Start your next adventure with{' '}
            <span className="text-secondary-500 font-medium">Amana Tours</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-lg border-gray-300 shadow-sm shadow-gray-300 focus:outline-0 focus:shadow-secondary-500"
              placeholder="Your Name.."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg border-gray-300 shadow-sm shadow-gray-300 focus:outline-0 focus:shadow-secondary-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg border-gray-300 shadow-sm shadow-gray-300 focus:outline-0 focus:shadow-secondary-500"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded-lg border-gray-300 shadow-sm shadow-gray-300 focus:outline-0 focus:shadow-secondary-500"
              placeholder="Re-enter password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 text-white font-semibold rounded-lg bg-primary-600 hover:bg-primary-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-400"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-secondary-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
