const hospitals = {
    pih: {
        name: 'PIH Health',
        logo: '/images/pih-logo.png',
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
    ucsf: {
        name: 'UCSF Health',
        logo: '/images/ucsf-logo.png',
        facilities: [
            {
                id: 'P7100-1',
                name: 'UCSF Hospital',
                address1: '400 Parnassus Ave',
                address2: 'San Francisco, CA 94143',
                phone: '(415) 353-2221',
            },
        ],
    },
    benioff: {
        name: "UCSF Benioff Children's Hospital",
        logo: '/images/benioff-logo.png',
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
}

export default hospitals
