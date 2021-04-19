import { Box, Text, Link } from '@/components/core'

export const FacilityAddress = ({ facility, className }) => {
    const { name, phone, fax, address, email } = facility
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
                <Text key={addressLine}>{addressLine}</Text>
            ))}
            <Text className="mt-4">
                Phone: <Link href={phoneLink}>{phone}</Link>
            </Text>
            {fax && <Text>{`Fax: ${fax}`}</Text>}
            {email && (
                <Link
                    href={`mailto:${email}`}
                    className="underline text-blue hover:text-black transition-colors"
                >
                    {email}
                </Link>
            )}
        </Box>
    )
}

export default FacilityAddress
