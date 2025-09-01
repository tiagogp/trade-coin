import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import { FC } from 'react'
import { IMarket } from '../../interfaces/IMarket'
import Footer from '../components/Footer'
import ListOfCoins from '../components/ListOfCoins'
import { getMarket } from '../services/getMarket'

interface HomeProps {
  coinValues: IMarket[]
}

const Home: FC<HomeProps> = ({ coinValues }) => (
  <motion.div
    exit={{ opacity: 0 }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
    className='relative flex flex-col justify-center items-center gap-12 mt-12'
  >
    <ListOfCoins coins={coinValues} />
    {coinValues.length > 0 && <Footer />}
  </motion.div>
)

export const getStaticProps = async () => {
  const currency = Cookies.get('currency') || 'usd'

  const payload = await getMarket(currency)
  return {
    props: {
      coinValues: payload,
      revalidate: 60 * 60 * 1, // 1 hour
    },
  }
}

export default Home
