const path = require('path')
const defaultImageSizes = [80, 160, 320, 480, 768, 1024, 1280]

const nextConfig = {
    env: {
        POSTS_PER_PAGE: 3,
    },
    images: {
        deviceSizes: [
            ...defaultImageSizes,
            ...defaultImageSizes.map(size => size * 2),
        ],
        domains: [],
    },
    webpack(config) {
        config.resolve.alias['@'] = path.resolve(__dirname)
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        })
        return config
    },
    // exportPathMap: async function () {
    //     return {
    //         '/': { page: '/' },
    //         '/pih': { page: '/pih' },
    //         '/pih/patient': {
    //             page: '/pih/patient',
    //         },
    //         '/pih/patient/request': {
    //             page: '/pih/patient/request',
    //         },
    //         '/pih/thirdparty': {
    //             page: '/pih/thirdparty',
    //         },
    //         '/pih/thirdparty/request': {
    //             page: '/pih/thirdparty/request',
    //         },
    //     }
    // },
}

module.exports = nextConfig
