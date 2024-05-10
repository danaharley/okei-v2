import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { siteConfig } from "@/config/site";

import { auth } from "@/auth";

import { ThemeProvider } from "@/components/theme-provider";
import { ModalProviders } from "@/components/providers/modal-providers";

import { cn } from "@/lib/utils";

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
      <html lang="en" suppressHydrationWarning>
        <body className={cn("bg-background antialiased", inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster richColors />
            <ModalProviders />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
