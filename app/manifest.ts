import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Telos Photography',
        short_name: 'Telos',
        description: 'Minimal photography portfolio focused on intentional storytelling.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
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
