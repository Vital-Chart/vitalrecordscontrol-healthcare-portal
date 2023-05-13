// PROPERTIES
// status: indicates status of hospital's portal for display on landing page
// slug: used in the CLNT field for the form
// name: hospital name
// logo: reference to the hospital's logo file - ex: '/images/carrell-logo.jpeg',
// isWhitelabel: used to remove VRC logo
// imageFee: cost per each image ordered
// altAuth: used to display alternate instructions on Upload page
// facilities: an array of facilities including id, name, address, phone, fax, and email
// buttonColor: custom button color for landing page buttons
// buttonTextColor: custom button text color for landing page buttons,

const hospitals = {
    aipc: {
        status: 'launched',
        slug: 'AIPC',
        name: 'Associates in Psychiatry and Counseling',
        logo: '/images/aipc-logo.png',
        isWhitelabel: false,
        altAuth: true,
        facilities: [
            {
                id: 'P1505-1',
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
    aoc: {
        status: 'launched',
        slug: 'AOC',
        name: 'Alabama Orthopedic Clinic',
        logo: '/images/aoc-logo.png',
        isWhitelabel: false,
        imageFee: '$8.00',
        facilities: [
            {
                id: 'P4000-1',
                name: 'Alabama Orthopedic Clinic',
                address: [
                    'ROI Department - 3rd Floor',
                    '3610 Springhill Memorial Drive North',
                    'Mobile, AL 12345',
                ],
                phone: '(251) 410-3652',
            },
        ],
    },
    boss: {
        status: 'review',
        slug: 'BOSS',
        name: 'Barrington Orthopedic Specialists Schaumburg',
        logo: '/images/BOS-tagline-RGB.jpg',
        isWhitelabel: true,
        processingTime: '7-10 business days',
        facilities: [
            {
                id: 'P1540-1',
                name: 'Barrington Orthopedic Specialists Schaumburg',
                address: [
                    '929 W. Higgins Road',
                    'Schaumburg, IL. 60195',
                ],
                phone: '312.243.9828',
                fax: '847.885.0130',
            },
        ],
    },
    benioff: {
        status: 'review',
        slug: 'BENIOFF',
        name: "UCSF Benioff Children's Hospital",
        logo: '/images/benioff-logo.png',
        isWhitelabel: true,
        processingTime: '14 business days',
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
        status: 'launched',
        slug: 'CARRELL',
        name: 'Carrell Clinic',
        logo: '/images/carrell-logo.jpeg',
        isWhitelabel: false,
        altAuth: true,
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
        status: 'launched',
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
    mimed: {
        status: 'review',
        slug: 'MIMED',
        name: "Michigan Medicine U of M",
        logo: '/images/mimed-logo.png',
        isWhitelabel: true,
        processingTime: '14 business days',
        facilities: [
            {
                id: 'P9900-1',
                name: "Michigan Medicine U of M",
                address: ['3621 South State Street, 700 KMS Place', 'Ann Arbor, MI 48108'],
                phone: '734.936.5490',
            },
        ],
    },
    orthoc: {
        status: 'launched',
        slug: 'ORTHOC',
        name: 'The Orthopaedic Center',
        logo: '/images/orthoc-logo.png',
        isWhitelabel: false,
        imageFee: '$10',
        altAuth: true,
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
        status: 'launched',
        slug: 'ORTHOG',
        name: 'The Orthopaedic Group',
        logo: '/images/orthog-logo.png',
        isWhitelabel: false,
        altAuth: true,
        facilities: [
            {
                id: 'P4087-1',
                name: 'The Orthopaedic Group, PC',
                address: [
                    'Vital Chart',
                    '6144 Airport Blvd',
                    'Mobile, AL 36608',
                ],
                phone: '(251) 341-2106',
            },
        ],
    },
    orthonw: {
        status: 'review',
        slug: 'ORTHONW',
        name: "Orthopedics Northwest",
        logo: '/images/OrthoNW-logo_only1.jpg',
        isWhitelabel: true,
        processingTime: '5-7 business days',
        facilities: [
            {
                id: 'P3502-1',
                name: "Orthopedics Northwest",
                address: ['2451 S Buffalo  Drive, Suite 130', 'Las Vegas, NV 89117'],
                phone: '702-410-9591',
            },
        ],
    },
    nsscspine: {
        status: 'launched',
        slug: 'NSSCSPINE',
        name: 'NSSC Spine Clinic',
        logo: '/images/nsscspine-logo.png',
        isWhitelabel: false,
        imageFee: '$6.50',
        altAuth: true,
        facilities: [
            {
                id: 'P2055-1',
                name: 'NSSC Spine Clinic',
                address: [
                    'Vital Records Control',
                    '3610 US Highway 31 - Suite C',
                    'Calera, AL 35040',
                ],
                phone: '(205) 319-2100',
            },
        ],
    },
    roc: {
        status: 'review',
        slug: 'ROC',
        name: "Regenerative Orthopedic Center",
        logo: '/images/roc-logo.png',
        isWhitelabel: true,
        processingTime: '5-7 business days',
        facilities: [
            {
                id: 'P3503-1',
                name: "Regenerative Orthopedic Center",
                address: ['2451 S Buffalo  Drive, Suite 130', 'Las Vegas, NV 89117'],
                phone: '702-410-9591',
            },
        ],
    },
    pal: {
        status: 'launched',
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
        status: 'launched',
        slug: 'PETVH',
        name: 'Petaluma Valley Hospital',
        logo: '/images/petvh-logo.jpeg',
        isWhitelabel: false,
        buttonColor: '#00338e',
        buttonTextColor: '#ffffff',
        facilities: [
            {
                id: 'P7030-1',
                name: 'Petaluma Valley Hospital',
                address: [
                    'Release of Information Coordinator',
                    '400 N. McDowell Blvd',
                    'Petaluma, CA 94954',
                ],
                phone: '(707) 778-2525',
                fax: '(707) 476-2231',
                email: 'ROI.PVH.HIM@StJoe.org',
            },
        ],
    },
    pqov: {
        status: 'launched',
        slug: 'PQOV',
        name: 'Queen of the Valley Medical Center',
        logo: '/images/pqov-logo.jpg',
        isWhitelabel: false,
        buttonColor: '#00338e',
        buttonTextColor: '#ffffff',
        facilities: [
            {
                id: 'P7070-1',
                name: 'Queen of the Valley Medical Center',
                address: [
                    'Release of Information Services Team',
                    '1000 Trancas Street',
                    'Napa, CA 94558',
                ],
                phone: '(707) 252-4411 x3003',
                fax: '(707) 257-4118',
                email: 'ROI.QVMC.HIM@StJoe.org',
            },
        ],
    },
    semu: {
        status: 'launched',
        slug: 'SEMU',
        name: 'Semmes Murphey Clinic',
        logo: '/images/semu-logo.png',
        isWhitelabel: false,
        altAuth: true,
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
        status: 'launched',
        slug: 'STROS',
        name: 'Santa Rosa Memorial Hospital',
        logo: '/images/stros-logo.jpg',
        isWhitelabel: false,
        buttonColor: '#00338e',
        buttonTextColor: '#ffffff',
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
                fax: '(707) 476-2232',
                email: 'ROI.SRM.HIM@StJoe.org',
            },
        ],
    },
    ucg: {
        status: 'launched',
        slug: 'UCG',
        name: 'Urgent Care Group',
        logo: '/images/ucg-logo.jpeg',
        isWhitelabel: false,
        altAuth: true,
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
        status: 'launched',
        slug: 'UCSF',
        name: 'UCSF Health',
        logo: '/images/ucsf-merged-logo.jpg',
        isWhitelabel: true,
        processingTime: '14 business days',
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
    uci: {
        status: 'launched',
        slug: 'UCI',
        name: 'UC Irvine Medical Center',
        logo: '/images/uci18_Health_4C_blue-2.25inches.png',
        isWhitelabel: true,
        processingTime: '14 business days',
        facilities: [
            {
                id: 'P7145-1',
                name: 'UC Irvine Medical Center',
                address: [
                    'Health Information Management',
                    '101 The City Drive South',
                    'Building 25A, Rte. 118',
                    'Orange, CA 92868',
                ],
                phone: '714.456.5670',
                fax: '714.456.7576',
                email: 'ROI@hs.uci.edu',
            },
        ],
    },
    'ucsf-lpph': {
        status: 'review',
        slug: 'UCSF-LPPH',
        name: 'UCSF-LPPH',
        logo: '/images/ucsf-lpph-logo.jpeg',
        isWhitelabel: true,
        processingTime: '14 business days',
        facilities: [
            {
                id: 'P7110-1',
                name: 'UCSF-LPPH',
                address: ['401 Parnassus Ave', 'San Francisco, CA 94147'],
                phone: '(415) 476-7776',
            },
        ],
    },
}

export default hospitals
