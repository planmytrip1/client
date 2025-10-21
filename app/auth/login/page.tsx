'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoginMutation } from '@/store/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/features/auth/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [login, { isLoading }] = useLoginMutation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      router.push('/');
    } catch (err: any) {
      setError(err.data?.message || 'Login failed. Please check your credentials.');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4 py-12">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary-600">Welcome Back</h2>
          <p className="text-gray-600 mt-1">
            Sign in to continue your journey with{' '}
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg border-gray-300 shadow-sm shadow-gray-300 focus:outline-0 focus:shadow-secondary-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg border-gray-300 shadow-sm shadow-gray-300 focus:outline-0 focus:shadow-secondary-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="text-secondary-500 rounded border-gray-300 focus:ring-secondary-500"
              />
              Remember me
            </label>
            <Link href="/auth/forgotPassword" className="text-secondary-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 text-white font-semibold rounded-lg bg-primary-600 hover:bg-primary-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-400"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{' '}
            <Link href="/auth/register" className="text-secondary-600 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
