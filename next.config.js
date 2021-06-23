// Configures Next.js
const path = require('path')
const defaultImageSizes = [80, 160, 320, 640]

const currentEnv = process.env.ENV || 'dev'

const envSettings = {
    dev: 'https://v2.abtroiplus.com/patientportalwebservicedev',
    test: 'https://v2.abtroiplus.com/patientportalwebservicetest',
    prod: 'https://v2.abtroiplus.com/patientportalwebserviceprod',
}

const nextConfig = {
    // productionBrowserSourceMaps: true,
    env: {
        CURRENT_ENV: currentEnv,
        CREATE_UPDATE_REQUEST_ENDPOINT: `${envSettings[currentEnv]}/PatientRequest/PersistPatientRequest`,
        COMPLETE_REQUEST_ENDPOINT: `${envSettings[currentEnv]}/PatientRequest/CompletePatientRequest`,
        CREATE_FORM_ENDPOINT: `${envSettings[currentEnv]}/AuthorizationForm/RenderForm`,
        GET_FORM_ENDPOINT: `${envSettings[currentEnv]}/AuthorizationForm/DisplayForm`,
        DELETE_UPLOAD_ENDPOINT: `${envSettings[currentEnv]}/Uploads/Delete`,
        VIEW_UPLOAD_ENDPOINT: `${envSettings[currentEnv]}/Uploads/RenderUpload`,
        CONTINUE_REQUEST_ENDPOINT: `${envSettings[currentEnv]}/PatientRequest/ReviveTrackingNumber`,
    },
    images: {
        deviceSizes: defaultImageSizes,
        domains: [],
    },
    webpack: (config, options) => {
        config.resolve.alias['@'] = path.resolve(__dirname)
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        })
        // Sentry
        if (!options.isServer) {
            config.resolve.alias['@sentry/node'] = '@sentry/browser'
        }
        config.plugins.push(
            new options.webpack.DefinePlugin({
                'process.env.NEXT_IS_SERVER': JSON.stringify(
                    options.isServer.toString()
                ),
            })
        )

        return config
    },
}

module.exports = nextConfig
