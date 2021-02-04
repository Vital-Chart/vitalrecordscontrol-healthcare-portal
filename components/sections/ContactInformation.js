import { Box, Flex, Label, Input, Select } from '@/components/core'

export const ContactInformation = ({ className }) => {
    return (
        <Box className={className}>
            <Box className="mb-4">
                <Label htmlFor="preferredNotificationMethod">
                    Preferred Notification Method
                </Label>
                <Select
                    name="YI_NOTICE_DD"
                    id="preferredNotificationMethod"
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
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                        type="tel"
                        name="YI_PN"
                        id="phoneNumber"
                        className="w-full mt-1"
                    />
                </Box>
                <Box>
                    <Label>Type</Label>
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
                <Label htmlFor="phoneNumberConfirm">Retype Phone Number</Label>
                <Input
                    type="tel"
                    name="YI_PHC"
                    id="phoneNumberConfirm"
                    className="w-full mt-1"
                />
            </Box>
            <Box className="mb-4">
                <Label htmlFor="emailAddress">Email Address</Label>
                <Input
                    type="email"
                    name="YI_EM"
                    id="emailAddress"
                    className="w-full mt-1"
                />
            </Box>
            <Box className="mb-4">
                <Label htmlFor="emailAddressConfirm">
                    Retype Email Address
                </Label>
                <Input
                    type="email"
                    name="YI_EMC"
                    id="emailAddressConfirm"
                    className="w-full mt-1"
                />
            </Box>
        </Box>
    )
}

export default ContactInformation
