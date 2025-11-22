// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'www.themealdb.com',
            'www.thecocktaildb.com',
            'images.unsplash.com'
        ],
        formats: ['image/webp', 'image/avif'],
    },
    // Remove the experimental.appDir since it's now stable in Next.js 14
}

module.exports = nextConfig