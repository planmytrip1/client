// components/AuthCheck.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetCurrentUserQuery } from '@/store/features/auth/authApi';
import { setCredentials, logout } from '@/store/features/auth/authSlice';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  
  const { data, error } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });
  
  useEffect(() => {
    // If we have a token but the user request fails, log out
    if (token && error) {
      dispatch(logout());
    }
    
    // If we get user data back successfully, update the auth state
    if (data?.user && token) {
      dispatch(
        setCredentials({
          user: data.user,
          token: token, // Now typescript knows token is not null
        })
      );
    }
  }, [data, error, token, dispatch]);
  
  return <>{children}</>;
}