import type { Metadata } from "next";
import { Cabin, Changa_One, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import { AuthProvider } from "@/components/provider/AuthProvider";
import { Toaster } from "sonner";
const changaOne = Changa_One({
  subsets : ["latin"],
  weight : ["400"],
  variable : "--font-changa-one",
  display : "swap"
})
const cabin = Cabin({
  subsets : ['latin'],
  weight : ['400', '500', '600', '700'],
  variable : "--font-cabin",
  display : "swap"
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BugState - Bug Tracking & Project Management",
  description: "Streamline your development workflow with BugState's powerful bug tracking and project management tools",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${cabin.variable} ${geistMono.variable} ${changaOne.variable} antialiased`}
      >
        <AuthProvider>

        <Navbar/>
        {children}
        <Toaster/>
        </AuthProvider>
      </body>
    </html>
  );
}
