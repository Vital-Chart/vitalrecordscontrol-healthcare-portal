const FormData = require('form-data')
const crypto = require('crypto')

const generateHmac = data => {
    const payload = [...data['FI_CB'], data['TRKNUM']]
    const hmac = crypto
        .createHmac('sha256', 'portal-test')
        .update(payload.join(':'))
        .digest('base64')
    return hmac
}

const createFormData = data => {
    const formData = new FormData()

    Object.keys(data).map(key => {
        const value = data[key]
        let fieldValue = value

        // Create comma separated strings from array values
        if (Array.isArray(value)) {
            fieldValue = value.join()
        }

        formData.append(key, fieldValue)
    })

    return formData
}

export default async function handler(req, res) {
    const { body } = req

    const hmac = generateHmac(body)

    const formData = createFormData({
        ...body,
        SECSIG: hmac,
    })

    try {
        const response = await fetch(
            process.env.CREATE_UPDATE_REQUEST_ENDPOINT,
            {
                method: 'POST',
                body: formData,
            }
        )

        const json = await response.json()

        return res.status(200).json(json)
    } catch (e) {
        // General server error
        return res.status(500).json({ errorNumber: [100000] })
    }
}
