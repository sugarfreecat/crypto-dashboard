import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { PriceHistoryPoint } from '../types/crypto'

interface PriceChartProps {
    data: PriceHistoryPoint[]
}

function formatPrice(value: number | undefined) {
    if(value === undefined) return ''
    return `$${value.toFixed(2)}`;
}

function formatDateOnly(timestamp: number) {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDateTime(timestamp: number) {
    return new Date(timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

function getDailyTicks(data: PriceHistoryPoint[]) {
    const seenDays = new Set<string>()
    const ticks: number[] = []

    for(const point of data) {
        const dayKey = new Date(point.timestamp).toDateString()
        if(!seenDays.has(dayKey)) {
            seenDays.add(dayKey)
            ticks.push(point.timestamp)
        }
    }

    return ticks
}

function PriceChart({ data }: PriceChartProps) {
    const dailyTicks = getDailyTicks(data)
    return(
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis 
                    dataKey="timestamp"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    ticks={dailyTicks}
                    tickFormatter={formatDateOnly}
                    tick={{ fontSize: 12 }} 
                    interval="preserveStartEnd" 
                />
                <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={formatPrice}
                />
                <Tooltip 
                    labelFormatter={(label) => formatDateTime(Number(label))}
                    formatter={(value) => [formatPrice(Number(value))]} 
                />
                <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default PriceChart