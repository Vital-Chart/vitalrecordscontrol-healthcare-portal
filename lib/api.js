import { createFormData } from '@/lib/helpers'

export async function fetchAPI({ endpoint, method = 'post', body = {} }) {
    try {
        const isFileUpload =
            typeof window !== 'undefined' && body instanceof FormData
        const options = {
            method,
            headers: {
                Accept: 'application/json',
            },
        }

        if (!isFileUpload) {
            options['headers']['Content-Type'] = 'application/json'
        }

        if (method !== 'get') {
            options.body = isFileUpload ? body : JSON.stringify(body)
        }

        const response = await fetch(endpoint, options)
        const data = await response.json()

        if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
            console.log('%cfetchAPI:', 'color: #00A7F7; font-weight: 700;', {
                endpoint,
                options,
                data,
            })
        }

        return data
    } catch (error) {
        return {
            inError: true,
            // TODO: Create "general server error" error
            errorNumber: [100000],
            errorMessage: error,
        }
    }
}

export async function createRequest(data) {
    const { files, ...fields } = data

    // Generate hmac signature
    const { hmac } = await fetchAPI({
        endpoint: '/api/generateHmac',
        body: createFormData(fields),
    })

    // Make request with hmac
    return await fetchAPI({
        endpoint: process.env.CREATE_UPDATE_REQUEST_ENDPOINT,
        body: createFormData({
            ...fields,
            SECSIG: hmac,
            ...files,
        }),
    })
}

export async function createAuthForm(trackingNumber, data) {
    // Generate hmac signature
    const { hmac } = await fetchAPI({
        endpoint: '/api/generateHmac',
        body: createFormData(data),
    })

    // Make request with hmac
    return await fetchAPI({
        endpoint: process.env.CREATE_FORM_ENDPOINT,
        body: createFormData({
            trackingNumberID: trackingNumber,
            SECSIG: hmac,
        }),
    })
}

export async function finishRequest(data) {
    const { esig, ...fields } = data

    // Generate hmac signature
    const { hmac } = await fetchAPI({
        endpoint: '/api/generateHmac',
        body: createFormData(fields),
    })

    // Make request with hmac
    return await fetchAPI({
        endpoint: process.env.COMPLETE_REQUEST_ENDPOINT,
        body: createFormData({
            ...fields,
            SECSIG: hmac,
            esig,
        }),
    })
}
