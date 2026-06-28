export interface CryptoData {
    id: string
    name: string
    symbol: string
    current_price: number
    price_change_percentage_24h: number
    image: string
}

export interface PriceHistoryPoint {
    date: string
    price: number
}