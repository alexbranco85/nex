import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from '../layouts/theme';
import NextAuthSessionProvider from "./providers/NextAuthSessionProvider";

export const metadata: Metadata = {
  title: "Sistema de Pontos",
  description: "Sistema de Pontos feito em React e Next com Autenticação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthSessionProvider>
      <ThemeProvider theme={theme}>
        <html lang="pt_BR">
          <body>{children}</body>
        </html>
      </ThemeProvider>
    </NextAuthSessionProvider>
  );
}
