import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fusehit — Find your sound",
  description:
    "Meet musicians, audition by sound, and build original music together in a shared creative studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
