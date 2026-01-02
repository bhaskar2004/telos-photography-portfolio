export default function Loading() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-black"></div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Loading</p>
            </div>
        </div>
    )
}
