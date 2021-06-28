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

        if (process.env.DEV_MODE === 'true') {
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
        endpoint: process.env.CREATE_UPDATE_REQUEST_ENDPOINT,
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
        endpoint: process.env.CREATE_FORM_ENDPOINT,
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
        endpoint: process.env.VIEW_UPLOAD_ENDPOINT,
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
        endpoint: process.env.DELETE_UPLOAD_ENDPOINT,
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
        endpoint: process.env.COMPLETE_REQUEST_ENDPOINT,
        body: createFormData({
            ...fields,
            SECSIG: secsig,
            esig,
        }),
    })
}

export async function continueRequest(data) {
    const { ...fields } = data

    const { secsig } = await fetchAPI({
        endpoint: '/api/generateSecsig',
        body: createFormData({ ...fields, esigType: 'continueRequest' }),
    })

    // MOCK ENDPOINTS:
    // Already Submitted
    // https://run.mocky.io/v3/08f507f8-0da2-4e30-b1c7-6226f367fd2d

    // Expired
    // https://run.mocky.io/v3/3278508e-5ae4-4872-bb02-fe56c0c577a5

    // Multiple Errors (including already submitted)
    // https://run.mocky.io/v3/4d0e4b8c-8920-4d6f-b36e-a3a80763ac3b

    // Multiple Errors (non-matched)
    // https://run.mocky.io/v3/f5413885-5a9c-4218-8c7a-522134d6e3f4

    return await fetchAPI({
        endpoint: process.env.CONTINUE_REQUEST_ENDPOINT,
        body: createFormData({
            ...fields,
            SECSIG: secsig,
        }),
    })
}
