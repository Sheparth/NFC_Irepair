import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-montserrat' })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'iRepair Arequipa · Reparación de iPhone y equipos Apple',
  description: 'Especialistas en reparación de iPhone y equipos Apple en Cayma y Miraflores. Tráelo hoy, lo tenemos listo hoy.',
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  themeColor: '#161616',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
