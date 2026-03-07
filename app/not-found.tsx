import Link from "next/link"
import { ArrowRight, Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-svh bg-background flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center space-y-12">
                <div className="space-y-4">
                    <h1 className="font-serif text-8xl md:text-[12rem] tracking-tighter leading-none text-foreground selection:bg-foreground selection:text-background">
                        404
                    </h1>
                    <p className="text-[11px] tracking-[0.5em] uppercase text-muted-foreground">
                        The light has shifted
                    </p>
                </div>

                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-serif italic max-w-sm mx-auto">
                    The moment you're looking for seems to have vanished into the shadows.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase hover:opacity-90 transition-all hover:gap-4 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                        <Home className="w-4 h-4" aria-hidden="true" />
                        Return Home
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>

                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase border-b border-foreground/20 pb-1 hover:border-foreground transition-all text-foreground/70 hover:text-foreground"
                    >
                        Browse Gallery
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
