const formidable = require('formidable')
const crypto = require('crypto')

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({
            keepExtensions: true,
        })

        form.parse(req, (err, fields, files) => {
            if (err) return reject({ isError: true, error })
            resolve({ fields, files })
        })
    })
}

export default async function handler(req, res) {
    const { fields } = await runMiddleware(req)

    let payload

    switch (fields['esigType']) {
        case 'createRequest':
            payload = fields['FI_CB'].split(',', 1).toString()
            break
        case 'getUploadedFile':
        case 'deleteUploadedFile':
            payload = [fields['TRKNUM'], fields['fileName']].join(':')
            break
        default:
            payload = fields['TRKNUM']
    }

    const secsig = crypto
        .createHmac('sha256', 'portal-test')
        .update(payload)
        .digest('hex')

    return res.status(200).json({ secsig })
}

export const config = {
    api: {
        bodyParser: false,
    },
}
