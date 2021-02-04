import { Box, Flex, Label, Input, Select } from '@/components/core'

export const ContactInformation = ({ className, thirdParty }) => {
    return (
        <Box className={className}>
            {thirdParty ? (
                <>
                    <Box className="mb-4">
                        <Label htmlFor="YI_NM">Name</Label>
                        <Input
                            type="text"
                            name="YI_NM"
                            id="YI_NM"
                            className="w-full mt-1"
                        />
                    </Box>
                    <Box className="mb-4">
                        <Label htmlFor="YI_ATN">Attention</Label>
                        <Input
                            type="text"
                            name="YI_ATN"
                            id="YI_ATN"
                            className="w-full mt-1"
                        />
                    </Box>
                    <Box className="mb-4">
                        <Label htmlFor="YI_ADDR1">Address</Label>
                        <Input
                            type="text"
                            name="YI_ADDR1"
                            id="YI_ADDR1"
                            className="w-full mt-1"
                        />
                    </Box>
                    <Box className="mb-4">
                        <Label htmlFor="YI_ADDR2">Address Line 2</Label>
                        <Input
                            type="text"
                            name="YI_ADDR2"
                            id="YI_ADDR2"
                            className="w-full mt-1"
                        />
                    </Box>
                    <Box className="mb-4">
                        <Label htmlFor="YI_CITY">City</Label>
                        <Input
                            type="text"
                            name="YI_CITY"
                            id="YI_CITY"
                            className="w-full mt-1"
                        />
                    </Box>
                    <Flex className="flex-col sm:flex-row mb-4">
                        <Label htmlFor="YI_ST_DD">State</Label>
                        <Select
                            className="mb-4 sm:mb-0"
                            name="YI_ST_DD"
                            id="YI_ST_DD"
                        >
                            <option>Select a State</option>
                            {/* TODO: Add states */}
                        </Select>
                        <Box>
                            <Label htmlFor="YI_ZIP">Zip</Label>
                            <Input
                                type="number"
                                name="YI_ZIP"
                                id="YI_ZIP"
                                className="w-full mt-1"
                            />
                        </Box>
                    </Flex>
                    <Box className="mb-4">
                        <Label htmlFor="YI_FAX">Fax</Label>
                        <Input
                            type="text"
                            name="YI_FAX"
                            id="YI_FAX"
                            className="w-full mt-1"
                        />
                    </Box>
                </>
            ) : (
                ''
            )}
            <Box className="mb-4">
                <Label htmlFor="YI_NOTICE_DD">
                    Preferred Notification Method
                </Label>
                <Select
                    name="YI_NOTICE_DD"
                    id="YI_NOTICE_DD"
                    className="w-full mt-1"
                >
                    <option value="text">
                        Text Message (Standard messaging rates may apply.)
                    </option>
                    <option value="email">Email</option>
                </Select>
            </Box>
            <Flex className="flex-col sm:flex-row mb-4">
                <Box className="mr-4">
                    <Label htmlFor="YI_PN">Phone Number</Label>
                    <Input
                        type="tel"
                        name="YI_PN"
                        id="YI_PN"
                        className="w-full mt-1"
                    />
                </Box>
                <Box>
                    <Label htmlFor="YI_PHT_DD">Type</Label>
                    <Select name="YI_PHT_DD" className="w-full mt-1">
                        <option defaultValue disabled>
                            Select phone type
                        </option>
                        <option key="mobile" value="mobile">
                            Mobile
                        </option>
                        <option key="home" value="home">
                            Home
                        </option>
                        <option key="work" value="work">
                            Work
                        </option>
                    </Select>
                </Box>
            </Flex>

            <Box className="mb-4">
                <Label htmlFor="YI_PHC">Retype Phone Number</Label>
                <Input
                    type="tel"
                    name="YI_PHC"
                    id="YI_PHC"
                    className="w-full mt-1"
                />
            </Box>
            <Box className="mb-4">
                <Label htmlFor="YI_EM">Email Address</Label>
                <Input
                    type="email"
                    name="YI_EM"
                    id="YI_EM"
                    className="w-full mt-1"
                />
            </Box>
            <Box className="mb-4">
                <Label htmlFor="YI_EMC">Retype Email Address</Label>
                <Input
                    type="email"
                    name="YI_EMC"
                    id="YI_EMC"
                    className="w-full mt-1"
                />
            </Box>
        </Box>
    )
}

export default ContactInformation
