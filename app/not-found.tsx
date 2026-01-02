import Link from "next/link"
import { ArrowRight, Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="font-serif text-8xl md:text-9xl tracking-tighter">404</h1>
                    <p className="text-[11px] tracking-[0.5em] uppercase text-gray-500">Page Not Found</p>
                </div>

                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-serif italic max-w-md mx-auto">
                    The page you're looking for seems to have wandered off into the unknown.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-xs tracking-widest uppercase hover:bg-gray-900 transition-all hover:gap-4 group"
                    >
                        <Home className="w-4 h-4" aria-hidden="true" />
                        Return Home
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>

                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 text-sm tracking-wider uppercase border-b border-black pb-1 hover:gap-3 transition-all text-black"
                    >
                        Browse Gallery
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
