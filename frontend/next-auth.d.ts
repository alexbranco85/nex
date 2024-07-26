// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      cpf: string;
      token: string;
      is_admin: boolean;
    };
  }
}
