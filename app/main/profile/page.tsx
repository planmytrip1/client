// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCurrentUserQuery } from '@/store/features/auth/authApi';
import { selectUser, setCredentials } from '@/store/features/auth/authSlice';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const { data, isLoading, refetch } = useGetCurrentUserQuery();
  
  useEffect(() => {
    if (data?.user) {
      setName(data.user.name);
      setEmail(data.user.email);
    } else if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [data, currentUser]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      // Simple PUT request to update profile
      const response = await fetch(`/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, email })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }
      
      setMessage('Profile updated successfully');
      
      // Update user info in state if returned
      if (result.user && result.token) {
        dispatch(setCredentials({
          user: result.user,
          token: result.token
        }));
      }
      
      // Refresh user data
      refetch();
      
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center p-8">Loading profile...</div>;
  }
  
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md my-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      {message && (
        <div className="bg-green-50 p-4 rounded-md mb-4 text-green-700">{message}</div>
      )}
      
      {error && (
        <div className="bg-red-50 p-4 rounded-md mb-4 text-red-700">{error}</div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}