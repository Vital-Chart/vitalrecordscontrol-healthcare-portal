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

    const trackingNumber = fields['TRKNUM']

    // Get only the first facility ID
    const facilityId = fields['FI_CB'].slice(0, 7)

    if (fields['hmacType'] === 'facilityId') {
        payload = facilityId
    }

    if (fields['hmacType'] === 'trackingFileName') {
        payload = [trackingNumber, fields['fileName']].join(':')
    }

    if (fields['hmacType'] === 'tracking') {
        payload = trackingNumber
    }

    const hmac = crypto
        .createHmac('sha256', 'portal-test')
        .update(payload)
        .digest('hex')

    // console.log({ payload, hmac })

    return res.status(200).json({ hmac })
}

export const config = {
    api: {
        bodyParser: false,
    },
}
