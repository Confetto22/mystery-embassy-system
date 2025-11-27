import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "../components/providers/react-query-provider";

export const metadata: Metadata = {
  title: "Mystery Management System",
  description: "Church management system for tracking members, events, and attendance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
