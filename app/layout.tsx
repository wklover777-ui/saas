import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saas-three-blush.vercel.app"),
  title: "BrainSync - Cloud Note Service",
  description: "Sync Your Thoughts, Simplify Your Life.",
  openGraph: {

    title: "BrainSync - Cloud Note Service",
    description: "Sync Your Thoughts, Simplify Your Life.",
    url: "https://www.brainsync.com", // TODO: 실제 서비스 도메인으로 변경해주세요
    siteName: "BrainSync",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BrainSync - Cloud Note Service",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainSync - Cloud Note Service",
    description: "Sync Your Thoughts, Simplify Your Life.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="min-h-screen flex flex-col bg-background text-on-background font-body-md overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
