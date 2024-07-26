import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest, NextApiResponse } from 'next';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials: any, req: any) {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          });
          const responseJson = await response.json();

          if (responseJson.user) {
            return responseJson.user;
          } else {
            console.error("Login failed:", responseJson);
            throw new Error(responseJson.message || "Login failed");
          }
        } catch (error) {
          console.log('error', error);
          throw new Error("Error authorizing user");
        }
      }
    })
  ],
  pages: {
    signIn: '/',
    error: '/'
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      return {
        ...session,
        user: {
          ...token
        }
      };
    },
  },
  session: {
    maxAge: 5 * 60,
  }
};

// Função de handler para NextAuth
const handler = (req: any, res: NextApiResponse) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };