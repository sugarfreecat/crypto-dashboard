import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCoinPriceHistory } from '../services/cryptoService'
import PriceChart from '../components/PriceChart'

function CoinDetail() {
    const { coinId } = useParams<{ coinId: string }>()
    const { data: history, isLoading, error } = useQuery({
        queryKey: ['priceHistory', coinId],
        queryFn: () => getCoinPriceHistory(coinId!),
        enabled: !!coinId
    })

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
                &larr; Back to Dashboard
            </Link>

            <h1 className="text-2xl font-bol text-gray-900 mb-4 capitalize">
                {coinId} — 7 day price history
            </h1>

            {isLoading && <p>Loading chart...</p>}
            {error && <p className="text-red-600">Error: {error.message}</p>}
            {history && <PriceChart data={history} />}
        </div>
    )
}

export default CoinDetail