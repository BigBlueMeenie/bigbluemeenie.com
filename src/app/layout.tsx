import "@fontsource/bowlby-one-sc";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Big Blue Meenie",
  description:
    "Big Blue Meenie is one of the oldest, largest, and certainly the most prolific open for hire private production houses for rock music on the east coast of America.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
