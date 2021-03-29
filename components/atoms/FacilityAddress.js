import { Box, Text, Link } from '@/components/core'

export const FacilityAddress = ({ facility, className }) => {
    const { id, name, phone, address, email } = facility
    const phoneNum = phone.split('x')[0].replace(/\D/g, '')
    const phoneExt = phone.split('x')[1]
    let phoneLink = `tel:${phoneNum}`

    if (phoneExt) {
        phoneLink += `,${phoneExt}`
    }

    return (
        <Box className={className}>
            <Text className="font-bold">{name}</Text>
            {address.map(addressLine => (
                <Text>{addressLine}</Text>
            ))}
            <Link href={phoneLink}>{phone}</Link>
        </Box>
    )
}

export default FacilityAddress
