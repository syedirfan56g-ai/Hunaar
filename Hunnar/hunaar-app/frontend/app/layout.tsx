import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hunaar - Automation Platform',
  description: 'Full-stack SaaS automation platform for seamless workflow integration',
  keywords: 'automation, workflow, integration, saas, pabbly connect alternative',
  authors: [{ name: 'Hunaar Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Hunaar - Automation Platform',
    description: 'Full-stack SaaS automation platform for seamless workflow integration',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}