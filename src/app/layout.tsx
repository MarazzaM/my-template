// These styles apply to every route in the application
import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Toaster } from "react-hot-toast";
// import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
// import NavigationMenu from "@/components/ui/NavMenu/NavigationMenu";
import { ThemeProvider } from "@/components/theme-provider"
// import { SiteHeader } from "@/components/site-header"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Next.js Prisma Postgres Auth Starter";
const description =
  "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.";
const nextAuthUrl = process.env.NEXTAUTH_URL;
if (!nextAuthUrl) {
  console.error('NEXTAUTH_URL is not defined');
}
export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  //default to localhost:3000, even tho the URL is required for Auth
  metadataBase: nextAuthUrl ? new URL(nextAuthUrl) : new URL("http://localhost:3000/"),
  // themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.variable}>
        {/* <Toaster /> */}
        <Suspense fallback="Loading...">
          {/* AuthStatus is an example component in how to use the auth info client-side */}
          {/* @ts-expect-error Async Server Component */}
          {/* <AuthStatus /> */}
        </Suspense>
        {/* <NavigationMenu /> */}
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <SiteHeader /> */}
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
