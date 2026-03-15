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
  metadataBase: new URL("https://bugstate.dev"),

  title: {
    default: "BugState",
    template: "%s | BugState"
  },

  description:
    "BugState helps developers learn backend engineering through hands-on workshops and real-world projects. Build scalable systems, learn microservices, Docker, and modern architecture.",

  keywords: [
    "backend development",
    "spring boot workshop",
    "developer workshops",
    "live coding projects",
    "microservices",
    "docker",
    "event driven architecture",
    "developer learning platform"
  ],

  authors: [{ name: "BugState" }],

  openGraph: {
    title: "BugState — Learn Backend Engineering Through Real Projects",
    description:
      "Join developer workshops and build production-grade systems with BugState.",
    url: "https://bugstate.dev",
    siteName: "BugState",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BugState Developer Platform"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "BugState — Developer Workshops & Live Projects",
    description:
      "Learn backend engineering with hands-on workshops and real-world projects.",
    images: ["/og-image.png"]
  },

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" }
    ]
  },

  robots: {
    index: true,
    follow: true
  }
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
