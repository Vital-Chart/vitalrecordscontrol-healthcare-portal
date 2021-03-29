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
                body,
                response: data,
            })
        }

        return data
    } catch (error) {
        return {
            inError: true,
            errorInformation: [
                {
                    errorNumber: [100000],
                    errorMessage: error,
                },
            ],
        }
    }
}

export async function createRequest(data) {
    const { files, ...fields } = data

    const { secsig } = await fetchAPI({
        endpoint: '/api/generateSecsig',
        body: createFormData({ ...fields, esigType: 'createRequest' }),
    })

    return await fetchAPI({
        endpoint: process.env.NEXT_PUBLIC_CREATE_UPDATE_REQUEST_ENDPOINT,
        body: createFormData({
            ...fields,
            SECSIG: secsig,
            ...files,
        }),
    })
}

export async function createAuthForm(trackingNumber, data) {
    const { ...fields } = data

    const { secsig } = await fetchAPI({
        endpoint: '/api/generateSecsig',
        body: createFormData({ ...fields, esigType: 'createAuthForm' }),
    })

    return await fetchAPI({
        endpoint: process.env.NEXT_PUBLIC_CREATE_FORM_ENDPOINT,
        body: createFormData({
            TRKNUM: trackingNumber,
            SECSIG: secsig,
        }),
    })
}

export async function getUploadedFile(trackingNumber, fileName, data) {
    const { ...fields } = data

    const { secsig } = await fetchAPI({
        endpoint: '/api/generateSecsig',
        body: createFormData({
            ...fields,
            fileName,
            esigType: 'getUploadedFile',
        }),
    })

    return await fetchAPI({
        endpoint: process.env.NEXT_PUBLIC_VIEW_UPLOAD_ENDPOINT,
        body: createFormData({
            TRKNUM: trackingNumber,
            fileName,
            SECSIG: secsig,
        }),
    })
}

export async function deleteUploadedFile(trackingNumber, fileName, data) {
    const { ...fields } = data

    const { secsig } = await fetchAPI({
        endpoint: '/api/generateSecsig',
        body: createFormData({
            ...fields,
            fileName,
            esigType: 'deleteUploadedFile',
        }),
    })

    return await fetchAPI({
        endpoint: process.env.NEXT_PUBLIC_DELETE_UPLOAD_ENDPOINT,
        body: createFormData({
            TRKNUM: trackingNumber,
            fileName,
            SECSIG: secsig,
        }),
    })
}

export async function finishRequest(data) {
    const { esig, ...fields } = data

    const { secsig } = await fetchAPI({
        endpoint: '/api/generateSecsig',
        body: createFormData({ ...fields, esigType: 'finishRequest' }),
    })

    return await fetchAPI({
        endpoint: process.env.NEXT_PUBLIC_COMPLETE_REQUEST_ENDPOINT,
        body: createFormData({
            ...fields,
            SECSIG: secsig,
            esig,
        }),
    })
}
