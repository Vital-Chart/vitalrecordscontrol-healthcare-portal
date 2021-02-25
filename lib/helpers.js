import * as dayjs from 'dayjs'

// Retrieve a key value from an object
export function get(object, key) {
    var keys = key.split('.')

    for (var i = 0; i < keys.length; i++) {
        if (!object.hasOwnProperty(keys[i])) {
            return null
        }
        object = object[keys[i]]
    }

    return object
}

// Remove/get margin values from className
const MRE = /m[trblxy]?-/
export const getClasses = test => className => {
    return className
        ? className
              .split(' ')
              .filter(Boolean)
              .filter(x => test(x.trim() || ''))
              .join(' ')
        : ''
}
export const getMargin = getClasses(k => MRE.test(k))
export const omitMargin = getClasses(k => !MRE.test(k))

// Parse YouTube or Vimeo URLs
export const parseVideoUrl = {
    parse: function (url) {
        // - Supported YouTube URL formats:
        //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
        //   - http://youtu.be/My2FRPA3Gf8
        //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
        // - Supported Vimeo URL formats:
        //   - http://vimeo.com/25451551
        //   - http://player.vimeo.com/video/25451551
        // - Also supports relative URLs:
        //   - //player.vimeo.com/video/25451551

        const parts = url.match(
            /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
        )

        let type = 'other'
        let allow = null
        if (parts) {
            if (parts[3].indexOf('youtu') > -1) {
                type = 'youtube'
                allow =
                    'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            } else if (parts[3].indexOf('vimeo') > -1) {
                type = 'vimeo'
                allow = 'autoplay; fullscreen'
            }
        }

        return {
            type,
            url,
            id: type === 'other' ? null : parts[6],
            allow,
        }
    },

    // Returns an embed URL
    createEmbed: function (url) {
        const parsedUrl = this.parse(url)

        if (parsedUrl.type == 'youtube') {
            return '//www.youtube.com/embed/' + parsedUrl.id
        } else if (parsedUrl.type == 'vimeo') {
            return '//player.vimeo.com/video/' + parsedUrl.id
        }

        return parsedUrl.url
    },

    // Returns a thumbnail image
    getThumbnail: function (url) {
        const parsedUrl = this.parse(url)
        let thumbUrl

        switch (parsedUrl.type) {
            case 'youtube':
                thumbUrl =
                    '//img.youtube.com/vi/' +
                    parsedUrl.id +
                    '/maxresdefault.jpg'
                break
            case 'vimeo':
                thumbUrl = '//i.vimeocdn.com/video/' + parsedUrl.id + '_640.jpg'
                break
            default:
                thumbUrl = ''
                break
        }

        return thumbUrl
    },
}

// Convert a string to kebabcase
export const toKebabCase = (str = '') => {
    return str
        .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map(x => x.toLowerCase())
        .join('-')
}

// Truncate a string, without cutting off words
export const truncate = (str, max = 100, more = '...') => {
    if (str.length > max) {
        let trimmedString = str.substr(0, max)

        // Re-trim to avoid word cutoff
        trimmedString = trimmedString.substr(
            0,
            Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
        )

        return `${trimmedString}${more}`
    }

    return str
}

// Return only unique values in array
export const uniqueArrayValues = (arr = [], key = '') => {
    if (typeof arr[0] === 'object')
        return arr.filter(
            (current, index, array) =>
                array.findIndex(item => item[key] === current[key]) === index
        )

    return [...new Set(arr)]
}

// Return a range of numbers
export const range = (from, to) => {
    return Array.from({ length: to - from + 1 }, _ => from++)
}

// Check if user is on a touch device
export const isTouchDevice = () => {
    return (
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0)
    )
}

// Create a FormData instance from an object
export const createFormData = data => {
    const formData = new FormData()

    Object.keys(data).map(key => {
        const value = data[key]
        let fieldValue = value

        if (key === 'files') {
            value.map(file => {
                formData.append('file[]', file)
            })
        } else {
            // Create comma separated strings from array values
            if (Array.isArray(value)) {
                fieldValue = value.join()
            }

            formData.append(key, fieldValue)
        }
    })

    return formData
}

// Format a phone number to: +1 (234) 567-8900
export const formatPhoneNumber = phoneNumber => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)

    if (match) {
        const intlCode = match[1] ? '+1 ' : ''
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }

    return null
}

export const regexPatterns = {
    phone: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    date: /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](18|19|20|21)\d\d/,
}

export const states = {
    AL: 'Alabama',
    AK: 'Alaska',
    AS: 'American Samoa',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District Of Columbia',
    FM: 'Federated States Of Micronesia',
    FL: 'Florida',
    GA: 'Georgia',
    GU: 'Guam',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MH: 'Marshall Islands',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    MP: 'Northern Mariana Islands',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PW: 'Palau',
    PA: 'Pennsylvania',
    PR: 'Puerto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VI: 'Virgin Islands',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
}
