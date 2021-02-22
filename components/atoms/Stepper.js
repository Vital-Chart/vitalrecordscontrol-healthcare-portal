import cx from 'classnames'
import { useRoute } from '@/lib/route'
import { Box, Flex, Link, Text } from '@/components/core'
import { Container } from '@/components/general'
import { StepperLink } from '@/components/atoms'

import IconSlash from '@/icons/icon-slash.svg'

export const Stepper = ({ className, ...props }) => {
    const { hospital, option, canUploadAuth, canSubmit } = useRoute()

    return (
        <Box className={cx('py-4 mb-4 bg-gray-lightest', className)} {...props}>
            <Container>
                <Box as="nav" className="flex" aria-label="Breadcrumb">
                    <Box as="ol" className="flex items-center space-x-4">
                        <Box as="li">
                            <Box>
                                <StepperLink
                                    href={`/${hospital}/${option}/form`}
                                    className="text-sm text-center sm:text-left"
                                >
                                    Request Information
                                </StepperLink>
                            </Box>
                        </Box>
                        <Box as="li">
                            <Flex className="items-center">
                                <IconSlash className="flex-shrink-0 h-5 w-5 text-gray-light" />
                                {canUploadAuth ? (
                                    <StepperLink
                                        href={`/${hospital}/${option}/upload`}
                                        className="ml-4 text-sm text-center sm:text-left"
                                    >
                                        Provide Authorization Information
                                    </StepperLink>
                                ) : (
                                    <Text className="ml-4 text-sm text-center sm:text-left text-gray">
                                        Provide Authorization Information
                                    </Text>
                                )}
                            </Flex>
                        </Box>
                        <Box as="li">
                            <Flex className="items-center">
                                <IconSlash className="flex-shrink-0 h-5 w-5 text-gray-light" />
                                {canSubmit ? (
                                    <StepperLink
                                        href={`/${hospital}/${option}/review`}
                                        className="ml-4 text-sm text-center sm:text-left"
                                    >
                                        Review & Submit
                                    </StepperLink>
                                ) : (
                                    <Text className="ml-4 text-sm text-center sm:text-left text-gray">
                                        Review & Submit
                                    </Text>
                                )}
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
export default Stepper
