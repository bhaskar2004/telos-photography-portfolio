import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fresnel.bhaskar.xyz'

// Update this whenever the page content meaningfully changes.
// Avoids misleading crawlers with a "last modified = right now" timestamp.
const STATIC_ROUTES: MetadataRoute.Sitemap = [
    {
        url: BASE_URL,
        lastModified: new Date('2026-03-01'),
        changeFrequency: 'monthly',
        priority: 1,
    },
    {
        url: `${BASE_URL}/gallery`,
        lastModified: new Date('2026-03-01'),
        changeFrequency: 'weekly',
        priority: 0.8,
    },
]

import { photos } from '@/lib/data'

async function getDynamicRoutes(): Promise<MetadataRoute.Sitemap> {
    return photos.map((photo) => ({
        url: `${BASE_URL}/gallery#${photo.slug}`, // Using anchor as there's no per-photo page yet, or update to your planned URL structure
        lastModified: new Date('2026-03-01'),
        changeFrequency: 'monthly',
        priority: 0.6,
    }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const dynamicRoutes = await getDynamicRoutes()
    return [...STATIC_ROUTES, ...dynamicRoutes]
}