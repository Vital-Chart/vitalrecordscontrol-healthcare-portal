import dynamic from 'next/dynamic'
const MicroModal = dynamic(() => import('react-micro-modal'), { ssr: false })
import useNavigation from '@/lib/useNavigation'
import { Box, Link, Text, Button } from '@/components/core'
import { PageHeading, ButtonWrapper } from '@/components/atoms'
import { Layout, Container, ScreenReader } from '@/components/general'
import IconClose from '@/icons/icon-close.svg'

const Instructions = () => {
    const { getLandingPage, getStepPage } = useNavigation()

    return (
        <Layout>
            <Container>
                <Box className="max-w-screen-md space-y-8">
                    <PageHeading className="pt-4">
                        Instructions for Quick Release to You
                    </PageHeading>

                    <Box>
                        <Text className="pb-4 leading-relaxed">
                            This website allows you to request copies of your
                            medical record and to retrieve it electronically.
                            Please read the important notes below before
                            continuing to use this system:
                        </Text>

                        <Box
                            as="ol"
                            className="pl-8 pb-2 space-y-2 list-decimal"
                        >
                            <Box as="li">
                                <Text as="span" className="font-bold">
                                    This option is for patients or parties with
                                    the power to make decisions on behalf of a
                                    patient
                                </Text>{' '}
                                (e.g., parents, guardians) to request records to
                                be electronically delivered to{' '}
                                <Text as="span" className="font-bold">
                                    YOU
                                </Text>
                                . Some materials, such as Radiology Imaging CDs
                                or Pathology Slides, require being sent via the
                                U.S. Postal service or require pick-up. **Note:
                                If you are a patient requesting records to be
                                delivered to a{' '}
                                <Text as="span" className="font-bold">
                                    THIRD-PARTY
                                </Text>{' '}
                                (e.g., healthcare provider, attorney, an
                                insurance company, or other),{' '}
                                <Link
                                    href={`${getLandingPage()}/sendto`}
                                    className="underline font-bold text-blue hover:text-black transition-colors"
                                >
                                    click here
                                </Link>{' '}
                                to fill out the correct form to submit your
                                request.**
                            </Box>
                            <Box as="li">
                                In order to protect your privacy and comply with
                                federal and state regulations, we need a copy of
                                your driver's license or other government-issued
                                ID before we can release your records.{' '}
                                <Text as="span" className="font-bold">
                                    Failure to upload all required documents
                                    through this system within 72 hours after
                                    beginning the process will result in your
                                    request being canceled.
                                </Text>
                            </Box>
                            <Box
                                as="ul"
                                className="pl-8 pb-2 space-y-2 list-disc"
                            >
                                <Box as="li">
                                    If you are on a mobile device (e.g.
                                    smartphone/tablet), you will need to
                                    electronically sign an authorization form
                                    and submit a picture of yourself holding
                                    your government-issued ID.
                                </Box>
                                <Box as="li">
                                    If you are on a non-mobile device (e.g.
                                    desktop/laptop computer) you will need to
                                    print, manually sign, and upload a scanned
                                    copy of an authorization form as well as
                                    your government-issued ID.
                                </Box>
                            </Box>
                            <Box as="li">
                                If you are not the patient, you will also need
                                to submit a legible image (picture or scanned)
                                of proof you are authorized to make medical
                                decisions for the patient.{' '}
                                <MicroModal
                                    trigger={handleOpen => (
                                        <Box
                                            as="button"
                                            onClick={handleOpen}
                                            className="underline font-bold text-blue hover:text-black transition-colors"
                                        >
                                            Click here for examples.
                                        </Box>
                                    )}
                                    children={handleClose => (
                                        <Box className="p-8 relative">
                                            <button
                                                onClick={handleClose}
                                                className="absolute top-0 right-0 h-4 w-4 text-blue cursor-pointer"
                                            >
                                                <IconClose
                                                    onClick={handleClose}
                                                    className=""
                                                />
                                                <ScreenReader>
                                                    Close
                                                </ScreenReader>
                                            </button>

                                            <Box>
                                                <Text className="text-xl font-bold">
                                                    Types of Supporting
                                                    Documents
                                                </Text>
                                                <Text className="mb-4">
                                                    Acceptable forms of
                                                    supporting documentation are
                                                    listed below. However, the
                                                    facility where the records
                                                    you are requesting are
                                                    located may have additional
                                                    or other requirements.
                                                </Text>
                                                <Box
                                                    as="ul"
                                                    className="list-disc pl-8 mb-4 text-sm"
                                                >
                                                    <Box as="li">
                                                        Power of Attorney for
                                                        Healthcare if the
                                                        patient is alive but
                                                        unable to sign for
                                                        themselves
                                                    </Box>
                                                    <Box as="li">
                                                        Executor's Documents if
                                                        the patient is deceased
                                                    </Box>
                                                    <Box as="li">
                                                        A copy of the deceased
                                                        patient's will
                                                    </Box>
                                                    <Box as="li">
                                                        Court Documents
                                                        identifying custodial
                                                        parent
                                                    </Box>
                                                    <Box as="li">
                                                        Birth Certificate
                                                    </Box>
                                                </Box>
                                                <Text>
                                                    Note: Please understand
                                                    until we have the
                                                    opportunity to review the
                                                    request against the medical
                                                    records, we do not know if
                                                    additional documentation
                                                    will be required. You will
                                                    be notified if we need
                                                    further documentation.
                                                </Text>
                                            </Box>
                                        </Box>
                                    )}
                                />
                            </Box>
                            <Box as="li">
                                Information requested through this system must
                                exactly match hospital records. Typographic
                                errors, such as patient name misspelling or
                                incorrect dates of service, may result in your
                                request being canceled or delayed.
                            </Box>
                            <Box as="li" className="pb-2 font-bold">
                                There may be a clerical/reproduction processing
                                fee charged. Items not able to be delivered
                                electronically (e.g. Radiology Imaging CDs or
                                Pathology Slides) may incur additional charges,
                                which will be displayed if selected.
                            </Box>
                            <Box as="li">
                                If you request records from multiple facilities,
                                you will get ONE tracking number for each
                                facility, as each facility processes records
                                separately.
                            </Box>
                        </Box>
                    </Box>

                    <ButtonWrapper className="pb-8">
                        <Button
                            as={Link}
                            href={getLandingPage()}
                            variant="outline"
                            className="flex-grow text-center"
                        >
                            Back
                        </Button>

                        <Button
                            as={Link}
                            href={getStepPage('form')}
                            variant="filled"
                            className="flex-grow text-center"
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
