import { useEffect, useState } from 'react'
import type { CryptoData } from './types/crypto'
import { getTopCoins } from './services/cryptoService'
import CoinCard from './components/CoinCard'
import CoinCardSkeleton from './components/CoinCardSkeleton'

function App() {
  const [coins, setCoins] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCoins() {
      try {
        const data = await getTopCoins()
        setCoins(data)
      } catch(error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadCoins()
  }, [])

  if(error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-3">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bol text-gray-900 mb-6">Crypto Dashboard</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ?
          Array.from({ length: 6 }).map((_, i) => <CoinCardSkeleton key={i} />) :
          coins.map((coin) => <CoinCard key={coin.id} coin={coin} />)}
      </ul>
    </div>
  )
}

export default App