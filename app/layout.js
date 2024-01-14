import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Country Info",
};

// Root layout component that wraps the entire application
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta charSet="UTF-8" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
