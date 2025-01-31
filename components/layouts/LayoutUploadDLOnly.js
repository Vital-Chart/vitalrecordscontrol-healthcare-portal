import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import cx from 'classnames'
import { useDropzone } from 'react-dropzone'
const MicroModal = dynamic(() => import('react-micro-modal'), { ssr: false })
import { useStore } from '@/lib/store'
import { createRequest, createAuthForm } from '@/lib/api'
import { isTouchDevice } from '@/lib/helpers'
import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Layout, Container, ScreenReader } from '@/components/general'
import { Box, Text, Flex, Button, Link } from '@/components/core'
import {
    SectionHeading,
    PageHeading,
    ButtonWrapper,
    ServerErrorList,
    UploadsList,
    Stepper,
    Alert,
} from '@/components/atoms'

import IconUpload from '@/icons/icon-upload.svg'
import IconClose from '@/icons/icon-close.svg'
import IconLoading from '@/icons/icon-loading.svg'

const TrackingNumber = ({ className }) => {
    const store = useStore()
    return (
        <Text as="span" className={cx('font-bold', className)}>
            {store.state.trackingNumbers
                .map(number => number.TrackingNumberID)
                .join(', ')}
        </Text>
    )
}

const FacilityList = () => {
    const store = useStore()
    const { hospital } = useNavigation()

    const facilities =
        store?.state?.form?.FI_CB && Array.isArray(store.state.form.FI_CB)
            ? store.state.form.FI_CB
            : [store.state.form.FI_CB]
    return (
        <>
            {facilities &&
                facilities.map(facilityId => {
                    const facility = hospitals[hospital].facilities.find(
                        x => x.id === facilityId
                    )
                    const trackingNumber = store.state.trackingNumbers.find(
                        number => number.FacilityID === facilityId
                    )

                    return (
                        <Text key={facilityId} className="pb-4">
                            <Text as="span" className="font-bold">
                                {facility.name}:
                            </Text>{' '}
                            {facility.phone}
                        </Text>
                    )
                })}
        </>
    )
}

export const LayoutUploadDLOnly = ({ children }) => {
    const store = useStore()
    const {
        getLandingPage,
        getStepPage,
        goToLandingPage,
        goToStep,
        hasUploadAccess,
        hospital,
        option,
    } = useNavigation()

    const [serverErrors, setServerErrors] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const hasTouch = isTouchDevice()

    const handleDrop = async droppedFiles => {
        let isDuplicate = false
        setServerErrors([])
        droppedFiles.map(droppedFile => {
            store.state.uploadedFiles.map(uploadedFile => {
                if (droppedFile.name === uploadedFile.name) {
                    isDuplicate = true
                    setServerErrors(prevState => [
                        ...prevState,
                        `${droppedFile.name} is already in use. Please use a unique name for each file.`,
                    ])
                }
            })
        })

        if (!isDuplicate) {
            setIsFetching(true)
            try {
                const { inError, errorInformation } = await createRequest({
                    ...store.state.form,
                    files: droppedFiles,
                })
                if (inError) {
                    setServerErrors(
                        errorInformation.map(error => error.errorNumber)
                    )
                    setIsFetching(false)
                } else {
                    store.dispatch({
                        type: 'ADD_FILES',
                        value: droppedFiles,
                    })
                    setIsFetching(false)
                }
            } catch (error) {
                // General server error
                console.error(error)
                setServerErrors([100000])
                setIsFetching(false)
            }
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/jpeg, image/png, image/tiff, .pdf',
    })

    const handleSubmit = () => {
        if (store.state.uploadedFiles.length > 0) {
            goToStep('review')
        } else {
            setServerErrors([100010])
        }
    }

    const getAuthForm = async () => {
        if (
            store.state.authForm &&
            store.state.authForm.expires > new Date().getTime()
        ) {
            window.open(store.state.authForm.url, '_blank')
            return
        }

        try {
            const { FormURI, inError, errorInformation } = await createAuthForm(
                store.state.trackingNumbers[0].TrackingNumberID,
                store.state.form
            )

            if (inError) {
                errorInformation.map(error => {
                    if (error.errorNumber === 100001) {
                        throw new Error(error)
                    }
                })
                setServerErrors(
                    errorInformation.map(error => error.errorNumber)
                )
            } else {
                setServerErrors([])

                store.dispatch({
                    type: 'UPDATE_AUTH_FORM',
                    value: FormURI,
                })

                window.open(FormURI, '_blank')
            }
        } catch (error) {
            // General server error
            console.error(error)
            setServerErrors([100000])
        }
    }

    // Redirect to form step if no tracking number exists
    useEffect(() => {
        if (!hasUploadAccess) goToLandingPage()
    }, [hasUploadAccess])

    if (typeof window === 'undefined' || !hasUploadAccess) {
        return null
    }

    return (
        <Layout>
            <Stepper className="mb-4" />

            <Container>
                <Box className="w-full max-w-screen-md space-y-4 pb-8">
                    <PageHeading className="pt-4">
                        <Text
                            as="span"
                            className="block pb-1 text-base md:text-lg font-normal text-gray-dark"
                        >
                            {option === 'patient'
                                ? 'Quick Release to You '
                                : 'Release to Third-Party '}
                        </Text>
                        Provide Authorization Information
                    </PageHeading>

                    {children}

                    <Box>
                        <Text className="pt-4 pb-4">
                            Your request has been saved and assigned tracking
                            number(s): <TrackingNumber />.
                        </Text>

                        <Text className="pb-4">
                            Please contact the following{' '}
                            {store.state.trackingNumbers.length === 1
                                ? 'facility'
                                : 'facilities'}{' '}
                            if you have any questions during this process:
                        </Text>

                        <FacilityList />
                    </Box>

                    {/* <Alert
                        primaryAlertText="Additional documentation is required to complete this request."
                        secondaryAlertText="Please follow the instructions below before proceeding."
                    /> */}

                    {hospitals[hospital].altAuth ? (
                        <Box className="p-8 bg-gray-lightest">
                            <Text className="pb-4 font-bold leading-relaxed">
                                The following items are required to complete
                                this request:
                            </Text>
                            <Box
                                as="ul"
                                className="pl-8 pb-4 space-y-2 list-disc"
                            >
                                <li>The patient’s driver’s license or ID,</li>
                                <li>Your own driver’s license or ID</li>
                                <li>
                                    Official documentation off your authority to
                                    make healthcare decisions for the patient{' '}
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
                                                        supporting documentation
                                                        are listed below.
                                                        However, the facility
                                                        where the records you
                                                        are requesting are
                                                        located may have
                                                        additional or other
                                                        requirements.
                                                    </Text>
                                                    <Box
                                                        as="ul"
                                                        className="list-disc pl-8 mb-4 text-sm"
                                                    >
                                                        <Box as="li">
                                                            Power of Attorney
                                                            for Healthcare if
                                                            the patient is alive
                                                            but unable to sign
                                                            for themselves
                                                        </Box>
                                                        <Box as="li">
                                                            Executor's Documents
                                                            if the patient is
                                                            deceased
                                                        </Box>
                                                        <Box as="li">
                                                            A copy of the
                                                            deceased patient's
                                                            will
                                                        </Box>
                                                        <Box as="li">
                                                            Court Documents
                                                            identifying
                                                            custodial parent
                                                        </Box>
                                                        <Box as="li">
                                                            Birth Certificate
                                                        </Box>
                                                    </Box>
                                                    <Text>
                                                        Note: Please understand
                                                        until we have the
                                                        opportunity to review
                                                        the request against the
                                                        medical records, we do
                                                        not know if additional
                                                        documentation will be
                                                        required. You will be
                                                        notified if we need
                                                        further documentation.
                                                    </Text>
                                                </Box>
                                            </Box>
                                        )}
                                    />
                                </li>
                            </Box>
                            <Text className="pb-4 leading-relaxed">
                                If you are unable to submit the required
                                images/documentation at this time, you may save
                                this request and return to this screen by
                                choosing "Continue a request I started
                                previously" on the main screen.{' '}
                                <Text as="span" className="font-bold">
                                    You must upload the required documentation
                                    within 72 hours or your request will be
                                    canceled.
                                </Text>
                            </Text>

                            <Text className="pb-4 leading-relaxed">
                                If you have any questions regarding the
                                documentation needed for your request, please
                                contact us at the number below.
                            </Text>

                            <FacilityList />

                            <Alert
                                primaryAlertText="If you're unable to complete your request at
                                this time, please press the button below to save
                                your request. If you're ready to proceed, follow
                                the instructions below to complete your request."
                            />

                            <Box className="pt-4">
                                <MicroModal
                                    trigger={handleOpen => (
                                        <Button
                                            variant="filled"
                                            className={cx(
                                                'mt-2 mr-2 mb-2',
                                                isFetching &&
                                                    'pointer-events-none'
                                            )}
                                            onClick={handleOpen}
                                        >
                                            <>Save and Finish Later</>
                                        </Button>
                                    )}
                                    children={handleClose => (
                                        <Box className="p-8 relative">
                                            <button
                                                onClick={handleClose}
                                                className="absolute top-0 right-0 h-4 w-4 text-blue cursor-pointer"
                                            >
                                                <IconClose
                                                    onClick={handleClose}
                                                />
                                                <ScreenReader>
                                                    Close
                                                </ScreenReader>
                                            </button>

                                            <Box className="mb-4 text-center">
                                                <Text className="mb-4 text-2xl font-bold">
                                                    Save Your Request
                                                </Text>
                                                <Box className="mb-4 p-6 border-2 border-gray-light">
                                                    <Text className="mb-4">
                                                        Write down your tracking
                                                        number before saving
                                                        your request:
                                                    </Text>
                                                    <Text className="text-xl">
                                                        <TrackingNumber />
                                                    </Text>
                                                </Box>

                                                <Text className="text-sm leading-relaxed">
                                                    Your request will expire if
                                                    not completed within 72
                                                    hours.
                                                </Text>
                                            </Box>
                                            <Flex className="justify-center">
                                                <Button
                                                    variant="filled"
                                                    className={cx(
                                                        'm-2',
                                                        isFetching &&
                                                            'pointer-events-none'
                                                    )}
                                                    onClick={() => {
                                                        store.dispatch({
                                                            type: 'RESET_REQUEST',
                                                            redirect:
                                                                getLandingPage(),
                                                        })
                                                    }}
                                                >
                                                    <>Save Request</>
                                                </Button>
                                            </Flex>
                                        </Box>
                                    )}
                                />
                            </Box>
                        </Box>
                    ) : (
                        <Box>
                            <Text className="pb-4 leading-relaxed">
                                <Text as="span" className="font-bold">
                                    All requests for medical records require
                                    proof of authorization.
                                </Text>{' '}
                                Note that your driver's license or other
                                government issued identification is required. If you
                                are requesting medical records as the
                                representative of the patient, copies of
                                documentation establishing your authority to
                                release medical records on the patient's behalf
                                are required and must be provided through the
                                secure upload below.{' '}
                            </Text>
                        </Box>
                    )}

                    {hasTouch ? (
                        <Text className="pb-4">
                            All requests for medical records require uploading
                            an image of you holding your driver's license or
                            other government-issued identification.
                        </Text>
                    ) : (
                        <Box id="continue" className="pt-4">
                            <Text className="pb-4">
                                To complete your request:
                            </Text>
                            <Box
                                as="ol"
                                className="pl-8 pb-4 space-y-2 list-decimal"
                            >
                                {hospitals[hospital].altAuth ? (
                                    <Box as="li">
                                        Scan or Photograph an image of your
                                        driver's license or other
                                        government-issued identification,
                                    </Box>
                                ) : (
                                    <>
                                        <Box as="li">
                                            Scan or photograph your government ID (i.e. driver's license),
                                        </Box>
                                    </>
                                )}
                                <Box as="li">
                                    If requesting on behalf of a patient, scan
                                    or photograph all pages of the additional
                                    required documentation,
                                </Box>
                                <Box as="li">
                                    Upload all photos/scans in the area below,
                                    and
                                </Box>
                                <Box as="li">
                                    Click{' '}
                                    <Text as="span" className="font-bold">
                                        Continue
                                    </Text>{' '}
                                    below.
                                </Box>
                            </Box>
                        </Box>
                    )}

                    <Box>
                        <SectionHeading>Your Upload Area</SectionHeading>
                        <Box
                            as="ul"
                            className="text-sm mb-4 pl-8 space-y-2 list-disc"
                        >
                            <Box as="li">
                                The files you upload must have{' '}
                                <Text as="span" className="font-bold">
                                    PDF, JPG/JPEG, TIF/TIFF, or PNG
                                </Text>{' '}
                                as their extension.
                            </Box>
                            <Box as="li">
                                Uploaded files must be{' '}
                                <Text as="span" className="font-bold">
                                    less than 10 MB in size
                                </Text>
                                . If your files are too large, consult your
                                device's documentation for instructions on
                                lowering the resolution and/or color depth and
                                compressing the file.
                            </Box>
                        </Box>

                        <Box as="form">
                            <Box {...getRootProps()}>
                                <input name="files" {...getInputProps()} />
                                <Box
                                    className={cx([
                                        'w-full p-8 rounded bg-gray-lightest border border-gray-light cursor-pointer',
                                        isDragActive
                                            ? 'bg-gray-400'
                                            : 'bg-gray-200',
                                    ])}
                                >
                                    <Flex className="items-center justify-center text-center text-gray-dark my-2">
                                        <IconUpload className="w-12 h-auto mr-4" />

                                        <Text className="font-bold">
                                            {hasTouch ? (
                                                <>
                                                    Tap Here to Take a Picture
                                                    or Upload Files
                                                </>
                                            ) : (
                                                <>
                                                    Drag files or{' '}
                                                    <Box
                                                        as="span"
                                                        className="underline"
                                                    >
                                                        click here
                                                    </Box>{' '}
                                                    to upload.
                                                </>
                                            )}
                                        </Text>
                                    </Flex>
                                </Box>
                            </Box>
                        </Box>

                        <UploadsList
                            setServerErrors={setServerErrors}
                            className="mt-8"
                        />
                    </Box>

                    <ServerErrorList className="my-4" errors={serverErrors} />

                    <ButtonWrapper className="pb-8">
                        <Button
                            as={Link}
                            href={getStepPage('form')}
                            variant="outline"
                            className="m-2"
                        >
                            Go Back
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => {
                                store.dispatch({
                                    type: 'RESET_REQUEST',
                                    redirect: getLandingPage(),
                                })
                            }}
                            className="m-2"
                        >
                            Cancel and Delete Request
                        </Button>

                        <Button
                            variant="filled"
                            disabled={isFetching}
                            className={cx(
                                'm-2',
                                isFetching && 'pointer-events-none'
                            )}
                            onClick={handleSubmit}
                        >
                            {isFetching ? (
                                <IconLoading className="w-6 text-gray-400 animate-spin" />
                            ) : (
                                <>Review and Submit Request</>
                            )}
                        </Button>
                    </ButtonWrapper>
                </Box>
            </Container>
        </Layout>
    )
}

export default LayoutUploadDLOnly
