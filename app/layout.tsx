import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Live Chat",
  description: "The fastest way to chat with your friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
