import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang='pt-br'>
    <Head>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href={`https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap`}
        rel='stylesheet'
      />

      <meta
        name='description'
        content='Trade Coin é uma plataforma de negociação de criptomoedas, onde você pode comprar e vender criptomoedas de forma simples e rápida.'
      />

      <meta
        name='keywords'
        content='criptomoedas, bitcoin, ethereum, litecoin, ripple, xrp, dogecoin, doge, binance, binance coin, bnb, trade, trade coin, tradecoin, negociação, negociação de criptomoedas, comprar, vender, comprar criptomoedas, vender criptomoedas, comprar bitcoin, vender bitcoin, comprar ethereum, vender ethereum, comprar litecoin, vender litecoin, comprar ripple, vender ripple, comprar xrp, vender xrp, comprar dogecoin, vender dogecoin, comprar doge, vender doge, comprar binance, vender binance, comprar binance coin, vender binance coin, comprar bnb, vender bnb'
      />

      <meta property='og:image' content='/logo.svg' />
      <meta property='og:image:type' content='image/svg' />
      <meta property='og:image:width' content='512' />
      <meta property='og:image:height' content='512' />
      <meta property='og:image:alt' content='Trade Coin' />

      <meta property='og:title' content='Trade Coin' />

      <meta property='author' content='Tiago Guimarães Pinto - tiagogp.com' />
    </Head>
    <body className='bg-[#EAECEF] dark:bg-[#2C2F3F]'>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
