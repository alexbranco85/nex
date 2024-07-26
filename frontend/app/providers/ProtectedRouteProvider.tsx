'use client'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRouteProvider({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  if (!session) {
    router.push('/');
    return null;
  }

  return children;
}