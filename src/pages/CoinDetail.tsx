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
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="text-blue-600 hover:underline mb-6 inline-flex items-center gap-1 text-sm font-medium">
                    &larr; Back to Dashboard
                </Link>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1 capitalize">
                        {coinId}
                    </h1>
                    <p className="text-sm text-gray-500 mb-6">7 day price history</p>

                    {isLoading && (
                        <div className="h-[300px] flex items-center justify-center">
                            <p className="text-gray-400">Loading chart...</p>
                        </div>
                    )}
                    {error && <p className="text-red-600 font-medium">Error: {error.message}</p>}
                    {history && <PriceChart data={history} />}
                </div>
            </div>
        </div>
    )
}

export default CoinDetail