// create a React component name AuthPage
import AuthLayout from '@/src/layout/authLayout';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react';

const AuthPage = () => {
  const router: NextRouter = useRouter();
  useEffect(() => {
    
  }, [router])
  return (
    <AuthLayout />
  )
}
export default AuthPage