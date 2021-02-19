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

        return data
    } catch (error) {
        console.log(error)
        return {
            inError: true,
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
        // endpoint: '/api/request',
        endpoint: process.env.CREATE_UPDATE_REQUEST_ENDPOINT,
        body: createFormData({
            ...fields,
            SECSIG: hmac,
            ...files,
        }),
    })
}
