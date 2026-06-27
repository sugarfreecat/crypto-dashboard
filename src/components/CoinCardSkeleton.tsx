function CoinCardSkeleton() {
    return (
        <li className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 mb-3 rounded" />
                <div className="h-3 w-12 bg-gray-200 mt-3 rounded" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-3 w-10 bg-gray-200 rounded" />
            </div>
        </li>
    )
}

export default CoinCardSkeleton