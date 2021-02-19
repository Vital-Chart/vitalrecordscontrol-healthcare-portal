import { useRouter } from 'next/router'
import cx from 'classnames'
import { Box, Flex, Link } from '@/components/core'
import { Container } from '@/components/general'

import IconSlash from '@/icons/icon-slash.svg'

export const Stepper = ({ className, ...props }) => {
    const router = useRouter()

    const hospital = router.pathname.split('/')[1]
    const option = router.pathname.split('/')[2]

    return (
        <Box className={cx('py-4 mb-4 bg-gray-lightest', className)} {...props}>
            <Container>
                <Box as="nav" className="flex" aria-label="Breadcrumb">
                    <Box as="ol" className="flex items-center space-x-4">
                        <Box as="li">
                            <Box>
                                <Link
                                    href={`/${hospital}/${option}/form`}
                                    className="text-sm text-center sm:text-left text-gray hover:text-gray-dark"
                                >
                                    Request Information
                                </Link>
                            </Box>
                        </Box>
                        <Box as="li">
                            <Flex className="items-center">
                                <IconSlash className="flex-shrink-0 h-5 w-5 text-gray-light" />
                                <Link
                                    href={`/${hospital}/${option}/upload`}
                                    className="ml-4 text-sm text-center sm:text-left text-gray hover:text-gray-dark"
                                >
                                    Upload Authorization
                                </Link>
                            </Flex>
                        </Box>
                        <Box as="li">
                            <Flex className="items-center">
                                <IconSlash className="flex-shrink-0 h-5 w-5 text-gray-light" />
                                <Link
                                    href={`/${hospital}/${option}/review`}
                                    className="ml-4 text-sm text-center sm:text-left text-gray hover:text-gray-dark"
                                >
                                    Review & Submit
                                </Link>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
export default Stepper
