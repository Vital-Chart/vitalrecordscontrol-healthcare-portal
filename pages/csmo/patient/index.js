import useNavigation from '@/lib/useNavigation'
import { Box, Link, Text, Button, Heading } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const Instructions = () => {
    const { getLandingPage, getStepPage } = useNavigation()

    return (
        <Layout>
            <Container>
                <Box className="w-full max-w-screen-md">
                    <PageHeading className="pt-4">
                        Instructions for Quick Release to You
                    </PageHeading>

                    <Box className="mt-8">
                        <Heading as="h3" variant="h3" className="mb-2">
                            Welcome! Please Read Below.
                        </Heading>
                        <Box as="ul" className="pl-8 space-y-2 list-disc">
                            <Box as="li">
                                This ordering site is for use by{' '}
                                <Text as="span" className="italic">
                                    patients only.
                                </Text>
                            </Box>
                            <Box as="li">
                                All written records (including imaging reports)
                                are provided to patients for a flat fee of $15
                                per request.
                            </Box>
                            <Box as="li">
                                ALL available medical records are provided. You
                                do not need to specify the types of written
                                records or dates of service.
                            </Box>
                            <Box as="li">
                                Written records (excludes X-Ray and MRI imaging)
                                are made available securely{' '}
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
                                If you need a CD of Images (MRI or X-rays),
                                please put in a separate request for the CD
                                through your portal account at{' '}
                                <Link
                                    href="https://sportmed.com/"
                                    className="text-blue underline hover:text-black transition-colors"
                                >
                                    sportmed.com
                                </Link>
                                .
                            </Box>
                            <Box as="li">
                                You will be texted when written records are
                                ready to access online.
                            </Box>
                        </Box>
                    </Box>

                    <Box className="mt-8">
                        <Heading as="h3" variant="h3" className="mb-2">
                            Who Can Order Patient Records?
                        </Heading>
                        <Box as="ul" className="pl-8 space-y-2 list-disc">
                            <Box as="li">
                                Patients who have reached the age of majority:
                                18 years of age or older{' '}
                                <Text as="span" className="font-bold">
                                    (NOTE: A parent may not request records on
                                    behalf of an adult child, regardless of
                                    insurance coverage, residence, etc.).
                                </Text>
                            </Box>
                            <Box as="li">
                                Parents/guardians who have the legal authority
                                to access a{' '}
                                <Text as="span" className="italic">
                                    minor
                                </Text>{' '}
                                child's records.
                            </Box>
                            <Box as="li">
                                A person who has the legal authority (healthCare
                                trustee/conservator, healthcare proxy,
                                medical/healthcare power of attorney) to make
                                healthcare decisions for a patient of any age.
                            </Box>
                        </Box>
                    </Box>

                    <Box className="mt-8">
                        <Heading as="h3" variant="h3" className="mb-2">
                            What You Need to Get Started
                        </Heading>
                        <Box
                            as="ol"
                            className="pl-8 pb-2 space-y-2 list-decimal"
                        >
                            <Box as="li">
                                The patient's valid driver's license or other
                                valid state-issued ID.
                            </Box>
                            <Box as="li">A credit card to make payment.</Box>
                            <Box as="li">
                                If you have the legal authority to make{' '}
                                <Text as="span" className="font-bold">
                                    healthcare
                                </Text>{' '}
                                decisions for a patient as a healthcare
                                trustee/conservator, healthcare proxy, or
                                medical/healthcare power of attorney, you must
                                upload two items: (a){' '}
                                <Text as="span" className="font-bold">
                                    YOUR OWN Driver's License/ID,
                                </Text>{' '}
                                AND (b){' '}
                                <Text as="span" className="font-bold">
                                    official documentation of your authority to
                                    make healthcare decisions for the patient.
                                </Text>{' '}
                                NOTE: A financial power of attorney is{' '}
                                <Text as="span" className="font-bold">
                                    not
                                </Text>{' '}
                                acceptable. If you cannot provide BOTH required
                                items, the patient must place his or her own
                                request.
                            </Box>
                        </Box>
                        <Text className="italic">
                            Please have these items handy before you start!
                        </Text>
                    </Box>

                    <ButtonWrapper className="my-8">
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
