import '@/styles/globals.css'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Footer } from 'src/components/footer-new'
import { Header } from 'src/components/header-new'
import { TailwindIndicator } from 'src/components/tailwind-indicator'
import { CurrencyProvider } from 'src/hooks/Currency'
import { fontSans } from 'src/lib/fonts'
import { siteConfig } from 'src/lib/site'
import { cn } from 'src/lib/utils'

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

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-popover font-sans text-foreground antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <CurrencyProvider>
              <div className='min-h-svh py-12 px-4 flex flex-col items-center'>
                {/* <BreadcrumbsFromPath /> */}
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
