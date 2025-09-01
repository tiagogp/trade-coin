import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Footer } from 'src/components/footer-new'
import { Header } from 'src/components/header-new'
import { TailwindIndicator } from 'src/components/tailwind-indicator'
import { CurrencyProvider } from 'src/hooks/Currency'
import { fontSans } from 'src/lib/fonts'
import { siteConfig } from 'src/lib/site'
import { cn } from 'src/lib/utils'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export interface IParams {
  params: { currency: string }
}

interface RootLayoutProps extends IParams {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-popover text-foreground antialiased',
            fontSans.className
          )}
        >
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <CurrencyProvider>
              <div className='min-h-svh py-12 px-4 flex flex-col items-center'>
                <div className='bg-zinc-900 border border-zinc-800 rounded-md w-full max-w-7xl'>
                  <Header />
                  <div>{children}</div>
                  <Footer />
                </div>
              </div>
            </CurrencyProvider>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
