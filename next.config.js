const path = require('path')
const defaultImageSizes = [80, 160, 320, 640]

const currentEnv = process.env.ENV || 'dev'

const envSettings = {
    dev: 'https://v2.abtroiplus.com/patientportalwebservicedev',
    test: 'https://v2.abtroiplus.com/patientportalwebservicetest',
    prod: 'https://v2.abtroiplus.com/patientportalwebserviceprod',
}

const nextConfig = {
    env: {
        CREATE_UPDATE_REQUEST_ENDPOINT: `${envSettings[currentEnv]}/PatientRequest/PersistPatientRequest`,
        COMPLETE_REQUEST_ENDPOINT: `${envSettings[currentEnv]}/PatientRequest/CompletePatientRequest`,
        CREATE_FORM_ENDPOINT: `${envSettings[currentEnv]}/AuthorizationForm/RenderForm`,
        GET_FORM_ENDPOINT: `${envSettings[currentEnv]}/AuthorizationForm/DisplayForm`,
        DELETE_UPLOAD_ENDPOINT: `${envSettings[currentEnv]}/Uploads/Delete`,
        VIEW_UPLOAD_ENDPOINT: `${envSettings[currentEnv]}/Uploads/RenderUpload`,
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
}

module.exports = nextConfig
