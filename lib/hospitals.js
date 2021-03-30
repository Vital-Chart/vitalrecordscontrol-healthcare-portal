const hospitals = {
    aipc: {
        status: 'review',
        slug: 'AIPC',
        name: 'Associates in Psychiatry & Counseling',
        logo: '/images/aipc-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P1505-1',
                name: 'Alabama Orthopaedic Clinic',
                address: [
                    'ROI Department - 3rd Floor',
                    '3610 Springhill Memorial Drive North',
                    'Mobile, AL 12345',
                ],
                phone: '(251) 410-3652',
            },
        ],
    },
    aoc: {
        status: 'in-progress',
        slug: 'AOC',
        name: 'Alabama Orthopedic Clinic',
        logo: '/images/aoc-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P4000-1',
                name: 'Associates in Psychiatry and Counseling',
                address: [
                    '1710 North Randall Road',
                    'Suite 100',
                    'Elgin, IL 60123',
                ],
                phone: '(205) 319-2100',
            },
        ],
    },
    benioff: {
        status: 'review',
        slug: 'BENIOFF',
        name: "UCSF Benioff Children's Hospital",
        logo: '/images/benioff-logo.png',
        isWhitelabel: true,
        processingTime: '5-7 business days',
        facilities: [
            {
                id: 'P7105-1',
                name: "Benioff Children's Hospital Oakland",
                address: ['747 52nd Street', 'Oakland, CA 94609'],
                phone: '(510) 428-3730',
            },
        ],
    },
    carrell: {
        status: 'review',
        slug: 'CARRELL',
        name: 'Carrell Clinic',
        logo: '/images/carrell-logo.jpeg',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P0008-1',
                name: 'Carrell Clinic',
                address: [
                    '9301 N. Central Expressway',
                    'Tower 1, Suite 500',
                    'Dallas, TX 75231',
                ],
                phone: '(214) 220-2468 x6',
            },
        ],
    },
    csmo: {
        status: 'review',
        slug: 'CSMO',
        name: 'Center for Sports Medicine & Orthopaedics',
        logo: '/images/csmo-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P2500-1',
                name:
                    'Chattanooga Orthopaedic Group (dba Center for Sports Medicine and Orthopaedics)',
                address: ['2415 McCallie Avenue', 'Chattanooga, TN 37404'],
                phone: '(423) 697-8759',
            },
        ],
    },
    orthoc: {
        status: 'in-progress',
        slug: 'ORTHOC',
        name: 'The Orthopaedic Center',
        logo: '/images/orthoc-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P4095-1',
                name: 'The Orthopaedic Center',
                address: [
                    'Vital Records Control',
                    '2830 Drake Avenue SW',
                    'Huntsville, AL 35805',
                ],
                phone: '(205) 319-2100',
            },
        ],
    },
    orthog: {
        status: 'in-progress',
        slug: 'ORTHOG',
        name: 'The Orthopaedic Group',
        logo: '/images/orthog-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P4087-1',
                name: 'The Orthopaedic Group',
                address: [
                    'Vital Chart',
                    '120 South Briery Road',
                    'Irving, TX 75060',
                ],
                phone: '(817) 966-8402',
            },
        ],
    },
    pal: {
        status: 'review',
        slug: 'PAL',
        name: 'Palomar Health Medical Records',
        logo: '/images/palomar-logo.png',
        isWhitelabel: false,
        processingTime: '5 business days',
        imageFee: '$6.50',
        facilities: [
            {
                id: 'P7150-1',
                name: 'Palomar Health Medical Records',
                address: ['2185 West Citracado Parkway', 'Escondido, CA 92029'],
                phone: '(760) 480-7911',
            },
        ],
    },
    petvh: {
        status: 'in-progress',
        slug: 'PETVH',
        name: 'Petaluma Valley Hospital',
        logo: '/images/petvh-logo.jpeg',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P7030-1',
                name: 'Petaluma Valley Hospital',
                address: [
                    'Release of Information Coordinator',
                    '400 N. McDowell Blvd',
                    'Petaluma, CA 94954',
                ],
                phone: '(707) 778-2648',
            },
        ],
    },
    pih: {
        status: 'review',
        slug: 'PIH',
        name: 'PIH Health',
        logo: '/images/pih-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P7202-1',
                name: 'PIH Health Hospital - Downey',
                address: ['11500 Brookshire Avenue', 'Downey, CA 90241'],
                phone: '(562) 904-5166 x26177',
            },
            {
                id: 'P7201-1',
                name: 'PIH Health Hospital - Whittier',
                address: ['12401 Washington Blvd ', 'Whittier, CA 90602 '],
                phone: '(562) 698-0811 x13685',
            },
            {
                id: 'P7203-1',
                name: 'PIH Health Physicians',
                address: ['12401 Washington Blvd', 'Whittier, CA 90602'],
                phone: '(562) 698-0811 x13858',
            },
        ],
    },
    semu: {
        status: 'in-progress',
        slug: 'SEMU',
        name: 'Semmes Murphey Clinic',
        logo: '/images/semu-logo.png',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P4097-1',
                name: 'Semmes Murphey Clinic',
                address: ['551 Western Drive', 'Ste. A', 'Mobile, AL 36607'],
                phone: '(251) 300-8053',
            },
        ],
    },
    stros: {
        status: 'in-progress',
        slug: 'STROS',
        name: 'Santa Rosa Memorial Hospital',
        logo: '/images/stros-logo.jpeg',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P7035-1',
                name: 'Santa Rosa Memorial Hospital',
                address: [
                    'Release of Information Coordinator',
                    '1165 Montgomery Drive',
                    'Santa Rosa, CA 95405',
                ],
                phone: '(707) 522-4396',
            },
        ],
    },
    ucg: {
        status: 'in-progress',
        slug: 'UCG',
        name: 'Urgent Care Group',
        logo: '/images/ucg-logo.jpeg',
        isWhitelabel: false,
        facilities: [
            {
                id: 'P2256-1',
                name: 'Urgent Care Group',
                address: ['3610 Highway 31', 'Suite C', 'Calera, AL 35040'],
                phone: '(205) 319-2100',
            },
        ],
    },
    ucsf: {
        status: 'review',
        slug: 'UCSF',
        name: 'UCSF Health',
        logo: '/images/ucsf-logo.png',
        isWhitelabel: true,
        processingTime: '5-7 business days',
        facilities: [
            {
                id: 'P7100-1',
                name: 'UCSF Health',
                address: [
                    'Health Information Services',
                    '400 Parnassus Ave',
                    'Room A88',
                    'San Francisco, CA 94143',
                ],
                phone: '(415) 353-2221',
            },
        ],
    },
}

export default hospitals
