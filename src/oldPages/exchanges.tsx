import { motion } from 'framer-motion'
import { FC } from 'react'
import Footer from '../components/Footer'
import ListOfExchanges, { IExchanges } from '../components/ListOfExchanges'
import { getExchange } from '../services/getExchange'

interface ExchangesProps {
  exchanges: IExchanges[]
}

const exchange: FC<ExchangesProps> = ({ exchanges }) => (
  <motion.div
    exit={{ opacity: 0 }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
    className='flex flex-col justify-center items-center gap-12 mt-12'
  >
    <ListOfExchanges exchanges={exchanges} />
    {exchanges.length > 0 && <Footer />}
  </motion.div>
)

export const getStaticProps = async () => {
  const payload = await getExchange()
  return {
    props: {
      exchanges: payload,
      revalidate: 60 * 60 * 1, // 1 hour
    },
  }
}

export default exchange
