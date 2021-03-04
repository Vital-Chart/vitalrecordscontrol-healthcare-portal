import { useEffect, useState, useCallback } from 'react'
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
} from '@/components/atoms'

import IconUpload from '@/icons/icon-upload.svg'
import IconClose from '@/icons/icon-close.svg'
import IconLoading from '@/icons/icon-loading.svg'

const FacilityList = () => {
    const store = useStore()

    return (
        <>
            {store?.state?.form?.FI_CB &&
                store.state.form.FI_CB.map(facilityId => {
                    return Object.keys(hospitals).map(hospitalKey => {
                        return hospitals[hospitalKey].facilities.map(
                            hospitalFacility => {
                                if (hospitalFacility.id === facilityId) {
                                    // TODO: Show tracking number with facility
                                    // const trackingNumber = store.state.trackingNumbers.find(number => number.FacilityID === facilityId)

                                    return (
                                        <Text key={facilityId} className="pb-4">
                                            <Text
                                                as="span"
                                                className="font-bold"
                                            >
                                                {hospitalFacility.name}
                                            </Text>{' '}
                                            - {hospitalFacility.phone}
                                        </Text>
                                    )
                                }
                            }
                        )
                    })
                })}
        </>
    )
}

export const LayoutUpload = ({ children }) => {
    const store = useStore()
    const {
        getLandingPage,
        getStepPage,
        goToLandingPage,
        goToStep,
        hasUploadAccess,
        option,
    } = useNavigation()

    const [serverErrors, setServerErrors] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const hasTouch = isTouchDevice()

    const handleDrop = useCallback(droppedFiles => {
        setServerErrors([])

        store.dispatch({
            type: 'ADD_FILES',
            value: droppedFiles,
        })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/jpeg, image/png, image/tiff, .pdf',
    })

    const handleSubmit = async () => {
        setServerErrors([])

        if (store.state.newFiles.length === 0) {
            if (store.state.uploadedFiles.length > 0) {
                // Redirect to next step
                goToStep('review')
            } else {
                setServerErrors([100010])
            }
        } else {
            setIsFetching(true)

            try {
                const { inError, errorInformation } = await createRequest({
                    ...store.state.form,
                    files: store.state.newFiles,
                })

                if (inError) {
                    setServerErrors(
                        errorInformation.map(error => error.errorNumber)
                    )

                    setIsFetching(false)
                } else {
                    setIsFetching(false)

                    store.dispatch({
                        type: 'UPDATE_UPLOADED_FILES',
                    })

                    // Redirect to next step
                    goToStep('review')
                }
            } catch (error) {
                // General server error
                setServerErrors([100000])
                setIsFetching(false)
            }
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
            setServerErrors([100000])
            // setIsFetching(false)
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
                <Box className="max-w-screen-md space-y-8 pb-8">
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

                    <Box className="pb-4 border-b border-gray-light">
                        <Text className="pb-4">
                            Your request has been saved and assigned tracking
                            number(s):{' '}
                            <Text as="span" className="font-bold">
                                {store.state.trackingNumbers
                                    .map(number => number.TrackingNumberID)
                                    .join(', ')}
                            </Text>
                            .
                        </Text>
                        {Array.isArray(store?.state?.form?.FI_CB) && (
                            <>
                                <Text className="pb-4">
                                    Please contact the following
                                    facility/facilities if you have any
                                    questions during this process:
                                </Text>

                                <FacilityList />
                            </>
                        )}
                    </Box>

                    {children}

                    <Box>
                        <Text className="pb-4 leading-relaxed">
                            <Text as="span" className="font-bold">
                                All requests for medical records require
                                printing out, signing, and uploading an image of
                                this{' '}
                                <Button
                                    className="underline font-bold text-blue hover:text-black transition-colors"
                                    onClick={getAuthForm}
                                >
                                    authorization form
                                </Button>
                                .
                            </Text>{' '}
                            Note that your driver's license or other government
                            issued identification is required in the
                            authorization form where indicated. If you are
                            requesting medical records as the representative of,
                            patient, copies of documentation establishing your
                            authority to release medical records on the
                            patient's behalf are required and must be provided
                            through the secure upload below.{' '}
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
                                            <IconClose onClick={handleClose} />
                                            <ScreenReader>Close</ScreenReader>
                                        </button>

                                        <Box>
                                            <Text className="text-xl font-bold">
                                                Types of Supporting Documents
                                            </Text>
                                            <Text className="mb-4">
                                                Acceptable forms of supporting
                                                documentation are listed below.
                                                However, the facility where the
                                                records you are requesting are
                                                located may have additional or
                                                other requirements.
                                            </Text>
                                            <Box
                                                as="ul"
                                                className="list-disc pl-8 mb-4 text-sm"
                                            >
                                                <Box as="li">
                                                    Power of Attorney for
                                                    Healthcare if the patient is
                                                    alive but unable to sign for
                                                    themselves
                                                </Box>
                                                <Box as="li">
                                                    Executor's Documents if the
                                                    patient is deceased
                                                </Box>
                                                <Box as="li">
                                                    A copy of the deceased
                                                    patient's will
                                                </Box>
                                                <Box as="li">
                                                    Court Documents identifying
                                                    custodial parent
                                                </Box>
                                                <Box as="li">
                                                    Birth Certificate
                                                </Box>
                                            </Box>
                                            <Text>
                                                Note: Please understand until we
                                                have the opportunity to review
                                                the request against the medical
                                                records, we do not know if
                                                additional documentation will be
                                                required. You will be notified
                                                if we need further
                                                documentation.
                                            </Text>
                                        </Box>
                                    </Box>
                                )}
                            />{' '}
                            If you have any questions regarding the
                            documentation needed for your request, please
                            contact us at the number above.
                        </Text>

                        {hasTouch ? (
                            <Text className="pb-4">
                                All requests for medical records require
                                uploading an image of you holding your driver's
                                license or other government-issued
                                identification.
                            </Text>
                        ) : (
                            <>
                                <Text className="pb-4">
                                    To complete your request:
                                </Text>
                                <Box
                                    as="ul"
                                    className="pl-8 pb-4 space-y-2 list-decimal"
                                >
                                    <Box as="li">
                                        Print out and sign this{' '}
                                        <Button
                                            className="underline font-bold text-blue hover:text-black transition-colors"
                                            onClick={getAuthForm}
                                        >
                                            authorization form
                                        </Button>{' '}
                                        along with a copy of a government-issued
                                        picture ID,
                                    </Box>
                                    <Box as="li">
                                        Scan or photograph all pages of the form
                                        along with your government ID,
                                    </Box>
                                    <Box as="li">
                                        If requesting on behalf of a patient,
                                        scan or photograph all pages of the
                                        additional required documentation,
                                    </Box>
                                    <Box as="li">
                                        Upload all photos/scans in the area
                                        below, and
                                    </Box>
                                    <Box as="li">
                                        Click{' '}
                                        <Text as="span" className="font-bold">
                                            Continue
                                        </Text>{' '}
                                        below.
                                    </Box>
                                </Box>
                            </>
                        )}

                        <Text className="pb-4 font-bold">
                            Please note the following:
                        </Text>

                        <Box as="ul" className="pl-8 space-y-2 list-disc">
                            <Box as="li">
                                If you are unable to submit the required
                                images/documentation at this time, you may
                                return to this screen by entering your tracking
                                number on the main menu and following the
                                prompts to log in with a temporary password that
                                will be sent to you."{' '}
                                <Text as="span" className="font-bold">
                                    You must upload the required documentation
                                    within 72 hours or your request will be
                                    canceled.
                                </Text>
                            </Box>
                            <Box as="li">
                                The files you upload must have PDF, JPG/JPEG,
                                TIF/TIFF, or PNG as their extension.
                            </Box>
                            <Box as="li">
                                Uploaded files must be less than 10 MB in size.
                                If your files are too large, consult your
                                device's documentation for instructions on
                                lowering the resolution and/or color depth and
                                compressing the file.
                            </Box>
                            <Box as="li">
                                This site will automatically log you out if you
                                are inactive or switch away from your browser to
                                another app for 10 minutes.
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <SectionHeading>Your Upload Area</SectionHeading>

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

                        <UploadsList className="mt-8" />
                    </Box>

                    <ServerErrorList className="my-4" errors={serverErrors} />

                    <ButtonWrapper className="pb-8">
                        <Button
                            as={Link}
                            href={getStepPage('form')}
                            variant="outline"
                            className="flex-grow m-2"
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
                            className="flex-grow m-2"
                        >
                            Cancel and Delete Request
                        </Button>

                        <Button
                            variant="filled"
                            disabled={isFetching}
                            className={cx(
                                'flex-grow m-2',
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

export default LayoutUpload
