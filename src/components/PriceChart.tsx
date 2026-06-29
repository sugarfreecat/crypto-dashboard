import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { PriceHistoryPoint } from '../types/crypto'

interface PriceChartProps {
    data: PriceHistoryPoint[]
}

function formatPrice(value: number | undefined) {
    if(value === undefined) return ''
    return `$${value.toFixed(2)}`;
}

function PriceChart({ data }: PriceChartProps) {
    return(
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} tickFormatter={formatPrice}/>
                <Tooltip formatter={(value) => [formatPrice(Number(value)), 'Price']} />
                <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default PriceChart