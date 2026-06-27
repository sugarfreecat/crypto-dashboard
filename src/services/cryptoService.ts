import type { CryptoData } from '../types/crypto'

const BASE_URL = 'https://api.coingecko.com/api/v3'

export async function getTopCoins(): Promise<CryptoData[]> {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`)

    if(!response.ok) {
        throw new Error('Failed to fetch crypto data')
    }

    return response.json()
}