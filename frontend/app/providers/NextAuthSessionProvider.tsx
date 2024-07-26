"use client"
import { SessionProvider } from "next-auth/react"

const NextAuthSessionProvider = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider refetchInterval={60}>
      {children}
    </SessionProvider>)
}

export default NextAuthSessionProvider