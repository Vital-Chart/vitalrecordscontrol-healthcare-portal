import { Box, Flex, Text } from '@/components/core'

export const UploadsList = ({ className }) => (
    <Box className={className}>
        <Flex className="bg-gray-light">
            <Box className="w-1/2 py-2 px-4">
                <Text as="p" className="uppercase text-sm font-bold">
                    File Name
                </Text>
            </Box>
            <Box className="w-1/4 py-2 px-4">
                <Text as="p" className="uppercase text-sm font-bold">
                    Size
                </Text>
            </Box>
            <Box className="w-1/4 py-2 px-4">
                <Text as="p" className="uppercase text-sm  font-bold">
                    Pages
                </Text>
            </Box>
        </Flex>
        <Flex className="border-b border-gray-light">
            <Box className="w-1/2 py-2 px-4">
                <Text as="p">ca_atty_agreement_20180129-1.pdf</Text>
            </Box>
            <Box className="w-1/4 py-2 px-4">
                <Text as="p">352.50 KB</Text>
            </Box>
            <Box className="w-1/4 py-2 px-4">
                <Text as="p">1</Text>
            </Box>
        </Flex>
        <Flex>
            <Box className="w-1/2 py-2 px-4">
                <Text as="p">File Name</Text>
            </Box>
            <Box className="w-1/4 py-2 px-4">
                <Text as="p">32 kb</Text>
            </Box>
            <Box className="w-1/4 py-2 px-4">
                <Text as="p">2</Text>
            </Box>
        </Flex>
    </Box>
)

export default UploadsList
