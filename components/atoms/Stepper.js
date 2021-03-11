import useNavigation from '@/lib/useNavigation'
import cx from 'classnames'
import { Box, Flex, Link, Text } from '@/components/core'
import { Container } from '@/components/general'

import IconSlash from '@/icons/icon-slash.svg'

const StepperLink = ({ children, href, className, ...props }) => {
    const { pathname } = useNavigation()

    return (
        <Link
            href={href}
            className={cx(
                pathname === href
                    ? 'font-bold text-black transition-colors'
                    : 'text-gray',
                'text-sm text-center sm:text-left hover:text-black',
                className
            )}
            {...props}
        >
            {children}
        </Link>
    )
}

export const Stepper = ({ className, ...props }) => {
    const { getStepPage, hasUploadAccess, hasSubmitAccess } = useNavigation()

    return (
        <Box className={cx('py-4 bg-gray-lightest', className)} {...props}>
            <Container>
                <Box as="nav" className="flex" aria-label="Breadcrumb">
                    <Box as="ol" className="flex items-center space-x-2">
                        <Box as="li">
                            <Flex className="items-center">
                                <StepperLink href={getStepPage('form')}>
                                    Request Information
                                </StepperLink>
                            </Flex>
                        </Box>

                        <Box as="li">
                            <Flex className="items-center">
                                <IconSlash className="flex-shrink-0 h-5 w-5 text-gray-light" />
                                {hasUploadAccess ? (
                                    <StepperLink
                                        href={getStepPage('upload')}
                                        className="ml-2"
                                    >
                                        Provide Authorization Information
                                    </StepperLink>
                                ) : (
                                    <Text className="ml-2 text-sm text-center sm:text-left text-gray">
                                        Provide Authorization Information
                                    </Text>
                                )}
                            </Flex>
                        </Box>

                        <Box as="li">
                            <Flex className="items-center">
                                <IconSlash className="flex-shrink-0 h-5 w-5 text-gray-light" />
                                {hasSubmitAccess ? (
                                    <StepperLink
                                        href={getStepPage('review')}
                                        className="ml-2"
                                    >
                                        Review & Submit
                                    </StepperLink>
                                ) : (
                                    <Text className="ml-2 text-sm text-center sm:text-left text-gray">
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
