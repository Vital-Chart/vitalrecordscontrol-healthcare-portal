const fs = require('fs')
const formidable = require('formidable')
const FormData = require('form-data')
const crypto = require('crypto')

const generateHmac = data => {
    const payload = [...data['FI_CB'], data['TRKNUM']]
    const hmac = crypto
        .createHmac('sha256', 'portal-test')
        .update(payload.join(':'))
        .digest('hex')
    return hmac
}

const createFormData = data => {
    const formData = new FormData()

    Object.keys(data).map(key => {
        if (key.includes('file')) {
            formData.append(key, fs.createReadStream(data[key].path))
        } else {
            formData.append(key, data[key])
        }
    })

    return formData
}

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({
            keepExtensions: true,
            multiples: true,
        })

        form.parse(req, (err, fields, files) => {
            if (err) return reject({ isError: true, error })
            resolve({ fields, files })
        })
    })
}

export default async function handler(req, res) {
    const { fields, files } = await runMiddleware(req)
    // const { fields, files } = await new Promise((resolve, reject) => {
    //     const form = new formidable.IncomingForm({ keepExtensions: true, multiples: true })

    //     form.parse(req, (err, fields, files) => {
    //         if (err) return reject({ isError: true, error })
    //         resolve({ fields, files })
    //     })
    // })

    const hmac = generateHmac(fields)

    const formData = createFormData({
        ...fields,
        ...files,
        SECSIG: hmac,
    })

    console.log(formData)

    try {
        const response = await fetch(
            process.env.CREATE_UPDATE_REQUEST_ENDPOINT,
            {
                method: 'post',
                body: formData,
            }
        )

        const json = await response.json()

        return res.status(200).json(json)
    } catch (error) {
        // General server error
        console.log(error)
        return res.status(500).json({ errorNumber: [100000] })
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}
