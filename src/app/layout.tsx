import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Providers} from "./providers";
import MainNavbar from '@/components/MainNavbar/MainNavbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Matricula Facil',
  description: 'Matricula Facil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <MainNavbar/>
        {children}
      </Providers>
      </body>
    </html>
  )
}
