import type { Metadata } from 'next'
import './globals.css'

import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import Sidebar from '@/components/contents/sidebar/Sidebar'
import Navbar from '@/components/navbar/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Socially',
  description: 'Create a social media app with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <Navbar />

              <main className="py-8">
                {/* container to center the content */}
                <div className="mx-auto max-w-7xl px-4">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="hidden lg:col-span-3 lg:block">
                      <Sidebar />
                    </div>
                    <div className="lg:col-span-9">{children}</div>
                  </div>
                </div>
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
