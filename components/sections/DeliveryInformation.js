import { Box, Flex, Label, Input, Select } from '@/components/core'

export const DeliveryInformation = ({ className }) => {
    return (
        <Box className={className}>
            <p className="mb-4">
                Normal processing time is 5 business days from time of receipt.
                Please contact us if you have any questions.
            </p>
            <p className="mb-2">
                <span className="font-bold">PIH Health Hospital - Downey:</span>{' '}
                (562) 904-5166 x26177
            </p>
            <p className="mb-2">
                <span className="font-bold">
                    PIH Health Hospital - Whittier:
                </span>{' '}
                (562) 698-0811 x13685
            </p>
            <p className="mb-2">
                <span className="font-bold">PIH Health Physicians:</span> (562)
                698-0811 x13858
            </p>
        </Box>
    )
}

export default DeliveryInformation
