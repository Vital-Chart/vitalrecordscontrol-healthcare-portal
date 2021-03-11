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

    // TODO: Clean this up, and include all hmac types

    if (fields['hmacType'] === 'request') {
        payload = [fields['TRKNUM'], ...fields['FI_CB'].split(',')].join(':')
        if (fields['TRKNUM'] === '') {
            payload = payload.slice(0, -1)
        }
    }

    if (fields['hmacType'] === 'delete') {
        payload = [fields['TRKNUM'], fields['fileName']].join(':')
    }

    if (fields['hmacType'] === 'authForm') {
        payload = [fields['TRKNUM'], fields['fileName']].join(':')
    }

    // Security Signatures
    // Uploads/Delete => TRKNUM:FileName
    // AuthorizationForm/RenderForm => TRKNUM
    // PatientRequest/CompletePatientRequest => TRKNUM
    // PatientRequest/PersistPatientRequest => TRKNUM(s):FaclityID(s) (comma separate, ordered by TRKNUM with corresponding order of FacilityIDs)

    const hmac = crypto
        .createHmac('sha256', 'portal-test')
        .update(payload)
        .digest('hex')

    console.log({ payload, hmac })

    return res.status(200).json({ hmac })
}

export const config = {
    api: {
        bodyParser: false,
    },
}
