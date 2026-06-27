import type { CryptoData } from '../types/crypto'

interface CoinCardProps {
    coin: CryptoData
}

function CoinCard({ coin }: CoinCardProps) {
    const isPositive = coin.price_change_percentage_24h >= 0

    return (
        <li className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                    <p className="font-semibold text-gray-800">{coin.name}</p>
                    <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
                </div>
            </div>

            <div className="text-right">
                <p className="font-semibold text-gray-800">
                    ${coin.current_price.toLocaleString()}
                </p>
                <p className={isPositive ? 'text-sm text-green-600' : 'text-sm text-red-600'}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
            </div>
        </li>
    )
}

export default CoinCard