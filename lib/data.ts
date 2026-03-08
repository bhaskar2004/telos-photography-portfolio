export interface Photo {
    id: number
    src: string
    title: string
    category: string
    description: string
    width: number
    height: number
    slug: string
}

export const photos: Photo[] = [
    {
        id: 1,
        src: "/photo1.jpg",
        title: "Misty Highlands",
        category: "Landscape",
        description: "Atmospheric landscape photography by Fresnel, capturing misty hills and lush green forests in India.",
        width: 1920,
        height: 1080,
        slug: "misty-highlands",
    },
    {
        id: 2,
        src: "/photo2.jpg",
        title: "Urban Skyline",
        category: "Architecture",
        description: "Minimalist urban sunset by Fresnel, featuring power lines framing a glowing sun in Bengaluru.",
        width: 1080,
        height: 1350,
        slug: "urban-skyline",
    },
    {
        id: 3,
        src: "/photo3.jpg",
        title: "Golden Hour Lake",
        category: "Landscape",
        description: "Serene lakeside at golden hour by Fresnel, distant mountains reflecting in calm water.",
        width: 1080,
        height: 1350,
        slug: "golden-hour-lake",
    },
    {
        id: 4,
        src: "/photo4.jpg",
        title: "Dusk Silhouette",
        category: "Editorial",
        description: "Palm trees silhouetted against a dramatic tropical sky at dusk, an archival capture by Fresnel.",
        width: 1080,
        height: 1440,
        slug: "dusk-silhouette",
    },
    {
        id: 5,
        src: "/photo5.jpg",
        title: "Eternal Rose",
        category: "Still Life",
        description: "Fine-art monochrome of a backlit rose by Fresnel, petals against a moody sky.",
        width: 1080,
        height: 1620,
        slug: "eternal-rose",
    },
    {
        id: 6,
        src: "/photo6.jpg",
        title: "Twilight Branches",
        category: "Landscape",
        description: "Stark tree branches silhouetted against fading twilight, a cinematic capture by Fresnel.",
        width: 1920,
        height: 1080,
        slug: "twilight-branches",
    },
    {
        id: 7,
        src: "/photo7.jpg",
        title: "Village Oasis",
        category: "Documentary",
        description: "Crystal-clear water gushing into a village pond amid rice fields, documented by Fresnel.",
        width: 1080,
        height: 1350,
        slug: "village-oasis",
    },
    {
        id: 9,
        src: "/photo9.jpg",
        title: "Nature's Geometry",
        category: "Macro",
        description: "Macro study of intricate fern fronds in emerald hues by Fresnel.",
        width: 1080,
        height: 1350,
        slug: "natures-geometry",
    },
    {
        id: 10,
        src: "/photo10.jpg",
        title: "Evergreen Depth",
        category: "Macro",
        description: "Abstract close-up of dense evergreen foliage, rich textures captured by Fresnel Photography.",
        width: 1080,
        height: 1440,
        slug: "evergreen-depth",
    },
]
