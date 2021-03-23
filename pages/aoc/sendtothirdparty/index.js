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
                        Instructions for Release to Third Party
                    </PageHeading>

                    <Text className="mb-4">
                        ALERT: This system lets you as a patient or
                        parent/guardian request that medical records be directed
                        to a designated third party. You will not be able to
                        access those records yourself. Only the third party will
                        be able to access them through a secure website. If you
                        prefer to access the records yourself and then direct
                        them to a third party in whatever way you wish, please
                        click here to use the 48-hour Quick Release short form
                        for Alabama Orthopedic Clinic.
                    </Text>

                    <Box>
                        <Heading as="h3" variant="h3" className="mb-2">
                            What You Need to Get Started
                        </Heading>
                        <Box
                            as="ol"
                            className="pl-8 pb-2 space-y-2 list-decimal"
                        >
                            <Box as="li">
                                The name, address, and fax number of the third
                                party to whom you are directing your records.
                            </Box>
                            <Box as="li">
                                A valid driver's license or other valid federal
                                or state ID
                            </Box>
                            <Box as="li">A credit card to make payment</Box>
                        </Box>
                        <Text className="italic">
                            Please have these items handy before you start!
                        </Text>
                    </Box>

                    <Box>
                        <Heading as="h3" variant="h3" className="mb-2">
                            Important - Please Read!
                        </Heading>
                        <Box as="ul" className="pl-8 mb-2 space-y-2 list-disc">
                            <Box as="li">
                                To ensure patient security, we do not fax or
                                mail paper records. We use the third party's fax
                                number only to send a notification to the third
                                party to go online to access the requested
                                records securely.
                            </Box>

                            <Box as="li">
                                We cannot control when or if the third party
                                listed on your request will access your records
                                on our secure website. You are solely
                                responsible for any and all follow-up with the
                                third party. If you would rather access your
                                records yourself and direct them to a third
                                party in whatever way you wish, please click
                                here to use the 48-hour Quick Release short form
                                for Alabama Orthopaedic Clinic to have your
                                records released directly to you.
                            </Box>

                            <Box as="li">
                                If you are requesting imaging (X-Rays, MRIs),
                                the images will be copied to a CD and mailed to
                                the third party at the address you have
                                provided.
                            </Box>

                            <Box as="li">
                                You will be required to pay $20 for the
                                processing of your request plus $8.00 for each
                                CD copy of imaging (X-Ray, MRI) that is mailed
                                to the third party.
                            </Box>

                            <Box as="li">
                                THERE ARE NO REFUNDS FOR ANY REASON WHATSOEVER.
                            </Box>
                        </Box>

                        <Text>
                            NOTE: Third parties are not eligible to use this
                            form to request records from Alabama Orthopedic
                            Clinic. Only patients or parents/guardians of
                            patients are eligible to request records using this
                            form.
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
