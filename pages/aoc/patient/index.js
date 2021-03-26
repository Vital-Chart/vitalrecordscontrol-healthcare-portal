import dynamic from 'next/dynamic'
const MicroModal = dynamic(() => import('react-micro-modal'), { ssr: false })
import useNavigation from '@/lib/useNavigation'
import { Box, Link, Text, Button, Heading } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container, ScreenReader } from '@/components/general'
import IconClose from '@/icons/icon-close.svg'

const Instructions = () => {
    const { getLandingPage, getStepPage } = useNavigation()

    return (
        <Layout>
            <Container>
                <Box className="w-full max-w-screen-md space-y-8">
                    <PageHeading className="pt-4">
                        Instructions for Quick Release to You
                    </PageHeading>

                    <Box>
                        <Heading as="h3" variant="h3" className="mb-2">
                            Welcome! Please Read Below.
                        </Heading>
                        <Box as="ul" className="pl-8 mb-6 space-y-2 list-disc">
                            <Box as="li">
                                This site is for{' '}
                                <Text as="span" className="italic">
                                    patients
                                </Text>{' '}
                                only.
                            </Box>
                            <Box as="li">
                                Processing fee: $20 plus $8 for each CD copy of
                                imaging (X-rays/MRIs).{' '}
                                <Text as="span" className="font-bold">
                                    THERE ARE NO REFUNDS FOR ANY REASON
                                    WHATSOEVER.
                                </Text>
                            </Box>
                            <Box as="li">
                                ALL available medical records are provided.
                            </Box>
                            <Box as="li">
                                Records (excluding X-Ray and MRI imaging) are
                                made available securely{' '}
                                <Text as="span" className="font-bold">
                                    online only
                                </Text>
                                . We do{' '}
                                <Text as="span" className="font-bold">
                                    not
                                </Text>{' '}
                                fax or mail records.
                            </Box>
                            <Box as="li">
                                You will be texted when written records are
                                ready to access online. You will receive no text
                                alerts regarding Imaging CDs.
                            </Box>
                            <Box as="li">
                                Imaging (X-Rays, MRIs) CDs may be picked up on
                                the 3rd floor of Alabama Orthopaedic Clinic or
                                mailed to you. Mail delivery can add up to 14
                                days.
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Heading as="h3" variant="h3" className="mb-2">
                            What You Need to Get Started
                        </Heading>
                        <Box
                            as="ol"
                            className="pl-8 pb-2 space-y-2 list-decimal"
                        >
                            <Box as="li">
                                A valid driver's license or other valid
                                state-issued ID.{' '}
                                <Text as="span" className="block italic">
                                    NOTE: If you are the parent / guardian of a
                                    child 18 years old or older, please include
                                    your driver's license/ID and the child's
                                    driver's license/ID; alternatively, the
                                    child may place his or her own request
                                    online.
                                </Text>
                            </Box>
                            <Box as="li">A credit card to make payment.</Box>
                        </Box>
                        <Text className="italic">
                            Please have these items handy before you start!
                        </Text>
                    </Box>

                    <ButtonWrapper className="pb-8">
                        <Button
                            as={Link}
                            href={getLandingPage()}
                            variant="outline"
                            className="flex-1 m-2"
                        >
                            Back
                        </Button>

                        <Button
                            as={Link}
                            href={getStepPage('form')}
                            variant="filled"
                            className="flex-1 m-2"
                        >
                            Continue
                        </Button>
                    </ButtonWrapper>
                </Box>
            </Container>
        </Layout>
    )
}

export default Instructions
