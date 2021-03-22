const hospitals = {
    aipc: {
        name: 'Associates in Psychiatry & Counseling',
        logo: '/images/aipc-logo.png',
        isWhitelabel: false,
        facilities: [],
    },
    aoc: {
        name: 'Alabama Orthopedic Clinic',
        logo: '/images/aoc-logo.png',
        isWhitelabel: false,
        facilities: [],
    },
    benioff: {
        name: "UCSF Benioff Children's Hospital",
        logo: '/images/benioff-logo.png',
        isWhitelabel: true,
        processingTime: '5-7 business days',
        facilities: [
            {
                id: 'P7105-1',
                name: "Benioff Children's Hospital Oakland",
                address1: '747 52nd Street',
                address2: 'Oakland, CA 94609',
                phone: '(510) 428-3730',
            },
        ],
    },
    carrell: {
        name: 'Carrell Clinic',
        logo: '/images/carrell-logo.jpeg',
        isWhitelabel: false,
        facilities: [],
    },
    csmo: {
        name: 'Center for Sports Medicine & Orthopaedics',
        logo: '/images/csmo-logo.png',
        isWhitelabel: false,
        facilities: [],
    },
    orthoc: {
        name: 'The Orthopaedic Center',
        logo: '/images/orthoc-logo.png',
        isWhitelabel: false,
        facilities: [],
    },
    orthog: {
        name: 'The Orthopaedic Group',
        logo: '/images/orthog-logo.png',
        isWhitelabel: false,
        facilities: [],
    },
    pal: {
        name: 'Palomar Health',
        logo: '/images/palomar-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P7150-1',
                name: 'Palomar Health Medical Records',
                address1: '2185 West Citracado Parkway',
                address2: 'Escondido, CA 92029',
                phone: '(760) 480-7911',
            },
        ],
    },
    petvh: {
        name: 'St. Joseph Health Petaluma Valley',
        logo: '/images/petvh-logo.jpeg',
        isWhitelabel: false,
        facilities: [],
    },
    pih: {
        name: 'PIH Health',
        logo: '/images/pih-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P7202-1',
                name: 'PIH Health Hospital - Downey',
                address1: '11500 Brookshire Avenue',
                address2: 'Downey, CA 90241',
                phone: '(562) 904-5166 x26177',
            },
            {
                id: 'P7201-1',
                name: 'PIH Health Hospital - Whittier',
                address1: '12401 Washington Blvd ',
                address2: 'Whittier, CA 90602 ',
                phone: '(562) 698-0811 x13685',
            },
            {
                id: 'P7203-1',
                name: 'PIH Health Physicians',
                address1: '12401 Washington Blvd',
                address2: 'Whittier, CA 90602',
                phone: '(562) 698-0811 x13858',
            },
        ],
    },
    semu: {
        name: 'PIH Health',
        logo: '/images/semu-logo.png',
        isWhitelabel: false,
        facilities: [],
    },
    stros: {
        name: 'St. Joseph Health Santa Rosa Memorial',
        logo: '/images/stros-logo.jpeg',
        isWhitelabel: false,
        facilities: [],
    },
    ucg: {
        name: 'Urgent Care Group',
        logo: '/images/ucg-logo.jpeg',
        isWhitelabel: false,
        facilities: [],
    },
    ucsf: {
        name: 'UCSF Health',
        logo: '/images/ucsf-logo.png',
        isWhitelabel: true,
        processingTime: '5-7 business days',
        facilities: [
            {
                id: 'P7100-1',
                name: 'UCSF Health',
                address1: 'Health Information Services',
                address2: '400 Parnassus Ave',
                address3: 'Room A88',
                address4: 'San Francisco, CA 94143',
                phone: '(415) 353-2221',
            },
        ],
    },
}

export default hospitals
