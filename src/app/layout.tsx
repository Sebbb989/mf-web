import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import MainNavbar from "@/components/MainNavbar/MainNavbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matrícula Fácil",
  description: "Matrícula Fácil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div>
            <Toaster position="top-center" />
            <MainNavbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
