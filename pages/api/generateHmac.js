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

    let payload = [...fields['FI_CB'].split(','), fields['TRKNUM']].join(':')

    if (fields['TRKNUM'] === '-1') {
        payload = payload.slice(0, -2)
    }

    // console.log({ payload })

    const hmac = crypto
        .createHmac('sha256', 'portal-test')
        .update(payload)
        .digest('hex')

    // console.log({ hmac })

    return res.status(200).json({ hmac })
}

export const config = {
    api: {
        bodyParser: false,
    },
}
