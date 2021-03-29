const path = require('path')
const defaultImageSizes = [80, 160, 320, 640]

const nextConfig = {
    images: {
        deviceSizes: defaultImageSizes,
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
    //         '/pih/sendto': {
    //             page: '/pih/sendto',
    //         },
    //         '/pih/sendto/request': {
    //             page: '/pih/sendto/request',
    //         },
    //     }
    // },
}

module.exports = nextConfig
