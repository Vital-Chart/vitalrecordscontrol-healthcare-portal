const path = require('path')
// const defaultImageSizes = [80, 160, 320, 480, 768, 1024, 1280]
const defaultImageSizes = [80, 160, 320, 640]

const nextConfig = {
    env: {
        CREATE_UPDATE_REQUEST_ENDPOINT:
            'https://v2.abtroiplus.com/patientportalwebservicedev/PatientRequest/PersistPatientRequest',
        COMPLETE_REQUEST_ENDPOINT:
            'https://v2.abtroiplus.com/patientportalwebservicedev/PatientRequest/CompletePatientRequest',
        CREATE_FORM_ENDPOINT:
            'https://v2.abtroiplus.com/patientportalwebservicedev/AuthorizationForm/RenderForm',
        GET_FORM_ENDPOINT:
            'https://v2.abtroiplus.com/patientportalwebservicedev/AuthorizationForm/DisplayForm',
        DELETE_UPLOAD_ENDPOINT:
            'https://v2.abtroiplus.com/patientportalwebservicedev/Uploads/Delete',
        VIEW_UPLOAD_ENDPOINT:
            'https://v2.abtroiplus.com/patientportalwebservicedev/Uploads/RenderUpload',
    },
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
