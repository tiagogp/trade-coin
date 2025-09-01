import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import CoinInfos, { CoinInfosSkeleton } from '../../components/CoinInfos'
import CoinInfosDetails from '../../components/CoinInfosDetails'
import CoinTrade, { CoinTradeSkeleton } from '../../components/CoinTrade'
import Footer from '../../components/Footer'
import Paths from '../../components/Paths'

import { motion } from 'framer-motion'
import { IMarket } from '../../../interfaces/IMarket'
import { useCurrency } from '../../hooks/Currency'
import { getCoin } from '../../services/getCoin'
import { toCapitalaze } from '../../utils/string'
const Chart = dynamic(() => import('../../components/Chart'), { ssr: false })

const pathOfRoute = ['Cryptocurrencies', 'Coins']

const CoinDetails = () => {
  const {
    query: { name },
  } = useRouter()
  const [coinValues, setCoinValues] = useState<IMarket>()
  const { atualCurrency } = useCurrency()

  useMemo(() => {
    ;(async () => {
      if (name) {
        const payload = await getCoin({ id: name, currency: atualCurrency })

        setCoinValues(payload[0])
      }
    })()
  }, [name, atualCurrency])

  return (
    <>
      <Head>
        <title>Trade Coin {`• ${toCapitalaze(name as string)}`}</title>
      </Head>
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
        className='flex w-full justify-center items-center'
      >
        <div className='max-w-screen-xl  w-full'>
          <Paths
            path={pathOfRoute}
            className='p-3 mt-4 md:mt-8'
            finalPath={coinValues?.name}
          />

          <div className='bg-white dark:bg-[#202230] py-8 px-4 md:px-10 rounded-2xl'>
            {coinValues ? (
              <>
                <CoinInfos infos={coinValues} />

                <div className='flex flex-col w-full'>
                  <CoinTrade infos={coinValues} />

                  <div className='flex flex-col-reverse lg:flex-row gap-2 w-full '>
                    <div className='w-full'>
                      <Chart
                        idCrypto={coinValues.id}
                        currency={atualCurrency}
                        name={coinValues.name}
                      />
                    </div>
                    <CoinInfosDetails infos={coinValues} />
                  </div>
                </div>
              </>
            ) : (
              <div className='animate-pulse'>
                <CoinInfosSkeleton />

                <div className='flex flex-col w-full mt-10'>
                  <CoinTradeSkeleton />
                  <div className='grid grid-cols-4 gap-4 mt-10 '>
                    <div className='h-96 rounded-xl gap-2 col-span-4 md:col-span-3'>
                      <div className='flex justify-between max-h-8 mb-5 gap-5'>
                        <div className='h-8 bg-slate-200 dark:bg-[#383b56] rounded-xl w-48'></div>
                        <div className='h-8 bg-slate-200 dark:bg-[#383b56] rounded-xl w-60'></div>
                      </div>
                      <div className='h-full bg-slate-200 dark:bg-[#383b56] rounded-xl w-full max-h-[20.75rem]'></div>
                    </div>
                    <div className='h-96 bg-slate-200 dark:bg-[#383b56] rounded-xl col-span-4 md:col-span-1'></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='flex flex-col justify-center items-center mt-12 w-full '>
            <Footer />
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default CoinDetails
