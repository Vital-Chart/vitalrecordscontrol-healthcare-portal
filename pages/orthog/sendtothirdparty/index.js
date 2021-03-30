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
                <Box className="w-full max-w-screen-md space-y-8">
                    <PageHeading className="pt-4">
                        Instructions for Release to Third-Party
                    </PageHeading>
                    <Box>
                        <Text className="pb-4 leading-relaxed">
                            This website allows you to submit requests for
                            copies of a patient's medical records to be sent to
                            yourself or to someone else. Please read the
                            important notes below before continuing to use this
                            system:
                        </Text>
                        <Box as="ol" className="pl-8 pb-2 list-decimal">
                            <Box as="li">
                                This website is designed for{' '}
                                <Text as="span" className="font-bold">
                                    patients
                                </Text>{' '}
                                or{' '}
                                <Text as="span" className="font-bold">
                                    parties with the power to make decisions on
                                    behalf of a patient (e.g. parents,
                                    guardians, personal representatives)
                                </Text>{' '}
                                to request records. Third parties should{' '}
                                <Link
                                    href="/pih"
                                    className="underline font-bold text-blue hover:text-black transition-colors"
                                >
                                    click here
                                </Link>{' '}
                                to view other options for requesting medical
                                records.
                            </Box>
                            <Box as="li">
                                In order to protect the patient's privacy and
                                comply with federal and state regulations, we
                                need a copy of your driver's license or other
                                government-issued ID as well as proof you are
                                authorized to make medical decisions for the
                                patient (if you are not the patient) before we
                                can release records.{' '}
                                <Text as="span" className="font-bold">
                                    Failure to upload all required documents
                                    through this system within 72 hours after
                                    beginning the process will result in your
                                    request being canceled.
                                </Text>
                            </Box>
                            <Box as="ul" className="pl-8 space-y-2 list-disc">
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
                                <Text as="span" className="font-bold">
                                    you will get ONE tracking number for each
                                    facility
                                </Text>
                                , as each facility processes records separately.{' '}
                                <Text as="span" className="font-bold">
                                    You will receive separate notifications and
                                    records from each facility.
                                </Text>
                            </Box>
                        </Box>
                        <Text>
                            If you are unable to complete the above, please
                            refer to{' '}
                            <Link
                                href="/pih"
                                className="underline font-bold text-blue hover:text-black transition-colors"
                            >
                                this page
                            </Link>{' '}
                            to review other options for submitting your request.
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
