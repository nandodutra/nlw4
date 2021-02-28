import { RankingProvider } from '../Contexts/RankingContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <RankingProvider>
      <Component {...pageProps} />
    </RankingProvider>
  )
}

export default MyApp
