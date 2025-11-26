import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edvancea - Master Excel, Finance, PowerPoint & More",
  description: "Your personalized learning platform for Excel, Finance, PowerPoint, and Video Editing. Learn with comprehensive step-by-step guides at your own pace.",
  keywords: ["Edvancea", "Excel", "Finance", "PowerPoint", "Video Editing", "Learning", "Education", "Skills"],
  authors: [{ name: "Edvancea Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Edvancea - Master New Skills",
    description: "Your personalized learning platform for professional skills development",
    siteName: "Edvancea",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edvancea - Master New Skills",
    description: "Your personalized learning platform for professional skills development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}