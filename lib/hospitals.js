const hospitals = {
    aipc: {
        slug: 'AIPC',
        name: 'Associates in Psychiatry & Counseling',
        logo: '/images/aipc-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P1505-1',
                name: 'Facility Name',
                address1: 'Address',
                address2: 'City, ST Zip',
                phone: '(123) 456-7890',
            },
        ],
    },
    aoc: {
        slug: 'AOC',
        name: 'Alabama Orthopedic Clinic',
        logo: '/images/aoc-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P4000-1',
                name: 'Facility Name',
                address1: 'Address',
                address2: 'City, ST Zip',
                phone: '(123) 456-7890',
            },
        ],
    },
    benioff: {
        slug: 'BENIOFF',
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
        slug: 'CARRELL',
        name: 'Carrell Clinic',
        logo: '/images/carrell-logo.jpeg',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P0008-1',
                name: 'Facility Name',
                address1: 'Address',
                address2: 'City, ST Zip',
                phone: '(123) 456-7890',
            },
        ],
    },
    csmo: {
        slug: 'CSMO',
        name: 'Center for Sports Medicine & Orthopaedics',
        logo: '/images/csmo-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P2500-1',
                name: 'Facility Name',
                address1: 'Address',
                address2: 'City, ST Zip',
                phone: '(123) 456-7890',
            },
        ],
    },
    orthoc: {
        slug: 'ORTHOC',
        name: 'The Orthopaedic Center',
        logo: '/images/orthoc-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P4095-1',
                name: 'Facility Name',
                address1: 'Address',
                address2: 'City, ST Zip',
                phone: '(123) 456-7890',
            },
        ],
    },
    orthog: {
        slug: 'ORTHOG',
        name: 'The Orthopaedic Group',
        logo: '/images/orthog-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P4087-1',
                name: 'Facility Name',
                address1: 'Address',
                address2: 'City, ST Zip',
                phone: '(123) 456-7890',
            },
        ],
    },
    pal: {
        slug: 'PAL',
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
        slug: 'PETVH',
        name: 'St. Joseph Health Petaluma Valley',
        logo: '/images/petvh-logo.jpeg',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P7030-1',
                name: 'Facility Name',
                address1: 'Address',
                address2: 'City, ST Zip',
                phone: '(123) 456-7890',
            },
        ],
    },
    pih: {
        slug: 'PIH',
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
        slug: 'SEMU',
        name: 'Semmes Murphy',
        logo: '/images/semu-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P4097-1',
                name: 'Facility Name',
                address1: 'Address',
                address2: 'City, ST Zip',
                phone: '(123) 456-7890',
            },
        ],
    },
    stros: {
        slug: 'STROS',
        name: 'St. Joseph Health Santa Rosa Memorial',
        logo: '/images/stros-logo.jpeg',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P7035-1',
                name: 'Facility Name',
                address1: 'Address',
                address2: 'City, ST Zip',
                phone: '(123) 456-7890',
            },
        ],
    },
    ucg: {
        slug: 'UCG',
        name: 'Urgent Care Group',
        logo: '/images/ucg-logo.jpeg',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P2256-1',
                name: 'Facility Name',
                address1: 'Address',
                address2: 'City, ST Zip',
                phone: '(123) 456-7890',
            },
        ],
    },
    ucsf: {
        slug: 'UCSF',
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
