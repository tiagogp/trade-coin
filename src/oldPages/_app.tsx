import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'
import Header from '../components/Header'
import { CurrencyProvider } from '../hooks/Currency'
import '../styles/globals.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider attribute='class'>
    <CurrencyProvider>
      <Head>
        <title>Trade Coin</title>
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Header />

      <Component {...pageProps} />
    </CurrencyProvider>
  </ThemeProvider>
)

export default MyApp
