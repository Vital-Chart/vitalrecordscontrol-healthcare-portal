import { Box, Text, Link } from '@/components/core'

export const FacilityAddress = ({ facility, className }) => {
    const { id, name, phone, address1, address2, address3, address4 } = facility
    const phoneNum = phone.split('x')[0].replace(/\D/g, '')
    const phoneExt = phone.split('x')[1]
    let phoneLink = `tel:${phoneNum}`

    if (phoneExt) {
        phoneLink += `,${phoneExt}`
    }

    return (
        <Box key={id} className={className}>
            <Text className="font-bold">{name}</Text>
            <Text>{address1}</Text>
            {address2 && <Text>{address2}</Text>}
            {address3 && <Text>{address3}</Text>}
            {address4 && <Text>{address4}</Text>}
            <Link href={phoneLink}>{phone}</Link>
        </Box>
    )
}

export default FacilityAddress
