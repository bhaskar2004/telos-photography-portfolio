export default function Loading() {
    return (
        <div className="min-h-svh bg-background flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-border border-t-primary"></div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Loading</p>
            </div>
        </div>
    )
}
