import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Fresnel Photography',
        short_name: 'Fresnel',
        description: 'Minimal photography portfolio focused on intentional storytelling.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f5f6f4',
        theme_color: '#23252a',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/favicon.png',
                sizes: 'any',
                type: 'image/png',
            }
        ],
    }
}
