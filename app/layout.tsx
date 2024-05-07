import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `% | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/okei.svg",
      href: "/okei.svg",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster richColors />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
