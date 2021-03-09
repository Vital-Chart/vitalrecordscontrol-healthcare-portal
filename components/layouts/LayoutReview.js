import { useEffect, useState, useRef } from 'react'
import cx from 'classnames'
import SignatureCanvas from 'react-signature-canvas'
import { useStore } from '@/lib/store'
import { finishRequest } from '@/lib/api'
import { isTouchDevice, formatPhoneNumber } from '@/lib/helpers'
import useNavigation from '@/lib/useNavigation'
import { Layout, Container } from '@/components/general'
import { Box, Text, Button, Link } from '@/components/core'
import {
    SectionHeading,
    PageHeading,
    ButtonWrapper,
    ServerErrorList,
    UploadsList,
    Stepper,
} from '@/components/atoms'

import IconLoading from '@/icons/icon-loading.svg'

function displayDatesOfService(store) {
    const { form } = store.state

    switch (form.VI_OPT) {
        case 'MR':
            return 'Most recent visit'
        case 'ALL':
            return 'All visits'
        case 'DR':
            return `${form.VI_DR_SD} - ${form.VI_DR_ED}`
        default:
            return null
    }
}

function displayRequestedInformation(store) {
    const { form } = store.state

    const requestedInfo =
        form.RI_CB && Array.isArray(form.RI_CB) ? form.RI_CB : [form.RI_CB]

    const info = requestedInfo.map(checkbox => {
        switch (checkbox) {
            case 'MR':
                return 'Medical Records'
            case 'IB':
                return 'Itemized Billing'
            case 'RI':
                return 'Radiology Images'
            case 'PS':
                return 'Pathology Slides'
            default:
                return null
        }
    })

    return info.join(', ')
}

function displayDeliveryMethod(store) {
    const { form } = store.state

    switch (form.DI_DM_DD) {
        case 'PS':
            return 'Postal Service - Mail'
        case 'PU':
            return 'Pick Up'
        default:
            return null
    }
}

export const LayoutReview = ({ children }) => {
    const store = useStore()
    const {
        hospital,
        getLandingPage,
        getStepPage,
        goToLandingPage,
        goToSuccessPage,
        hasSubmitAccess,
        option,
    } = useNavigation()
    const canvasRef = useRef(null)
    const [serverErrors, setServerErrors] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const hasTouch = isTouchDevice()

    const handleSubmit = async () => {
        setIsFetching(true)
        setServerErrors([])

        try {
            const { inError, errorInformation } = await finishRequest({
                ...store.state.form,
                esig: store.state.signature,
            })

            if (inError) {
                setServerErrors(
                    errorInformation.map(error => error.errorNumber)
                )
                setIsFetching(false)
            } else {
                setIsFetching(false)

                store.dispatch({
                    type: 'UPDATE_SUCCESS',
                    value: hospital,
                })
            }
        } catch (error) {
            // General server error
            setServerErrors([100000])
            setIsFetching(false)
        }
    }

    // Redirect to landing page if no submit access or there is success data
    useEffect(() => {
        if (store.state.success) goToSuccessPage()
        else if (!hasSubmitAccess) goToLandingPage()
    }, [store, hasSubmitAccess])

    if (typeof window === 'undefined' || !hasSubmitAccess) {
        return null
    }

    return (
        <Layout>
            <Stepper className="mb-4" />

            <Container>
                <Box className="max-w-screen-md space-y-8 pb-8">
                    <Box>
                        <PageHeading className="pt-4 mb-8">
                            <Text
                                as="span"
                                className="block pb-1 text-base md:text-lg font-normal text-gray-dark"
                            >
                                {option === 'patient'
                                    ? 'Quick Release to You '
                                    : 'Release to Third-Party '}
                            </Text>
                            Review & Submit
                        </PageHeading>

                        <Text className="leading-relaxed">
                            Please review your submission below for accuracy. If
                            there are any errors,{' '}
                            <Link
                                href={getStepPage('form')}
                                className="underline font-bold text-blue hover:text-black transition-colors"
                            >
                                please click here to correct them.
                            </Link>{' '}
                            Errors such as patient name misspelling, incorrect
                            date of birth, or incorrect dates of service may
                            result in your request being canceled. If there are
                            no errors and you have uploaded all required
                            documentation, you must click "Submit Request for
                            Processing" below to complete submission of your
                            request. Normal processing time is 7-14 days after
                            submission.
                        </Text>
                    </Box>

                    {children}

                    <Box className="space-y-4">
                        <SectionHeading className="uppercase">
                            Request(s) Summary
                        </SectionHeading>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Tracking Number(s):
                            </Text>{' '}
                            {store.state.trackingNumbers
                                .map(number => number.TrackingNumberID)
                                .join(', ')}
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Patient Name:
                            </Text>{' '}
                            {`${store.state.form.PI_PFN} ${store.state.form.PI_PLN} `}
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Patient DOB:
                            </Text>{' '}
                            {store.state.form.PI_DOB}
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Dates of Service:
                            </Text>{' '}
                            {displayDatesOfService(store)}
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Requested Information:
                            </Text>{' '}
                            {displayRequestedInformation(store)}
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Purpose of Request:
                            </Text>{' '}
                            {store.state.form.PR_PUR}
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Limitations:
                            </Text>{' '}
                            {store.state.form?.PR_LIM || 'None'}
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Phone:
                            </Text>{' '}
                            {formatPhoneNumber(store.state.form.YI_PN)}
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Email:
                            </Text>{' '}
                            {store.state.form.YI_EM}
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Delivery Method for Records:
                            </Text>{' '}
                            VitalChart &reg; Virtual ROI Portal
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Delivery Method for CDs/Slides:
                            </Text>{' '}
                            {displayDeliveryMethod(store) || 'No Delivery'}
                        </Text>

                        <Button
                            as={Link}
                            href={getStepPage('form')}
                            variant="outline"
                            className="inline-block"
                        >
                            Edit Request Information
                        </Button>
                    </Box>

                    <Box className="space-y-4">
                        <SectionHeading className="uppercase">
                            Uploaded Files
                        </SectionHeading>

                        <UploadsList isEditable={false} />

                        <Button
                            as={Link}
                            href={getStepPage('upload')}
                            variant="outline"
                            className="inline-block"
                        >
                            Upload Additional Documentation
                        </Button>
                    </Box>

                    {hasTouch && (
                        <Box className="pt-8 border-t-2 border-gray-light">
                            <Text className="mb-2">
                                Sign in the box below to complete submission of
                                your medical records request:
                            </Text>

                            <Box className="w-full border">
                                <SignatureCanvas
                                    ref={canvasRef}
                                    onEnd={() => {
                                        canvasRef.current
                                            .getTrimmedCanvas()
                                            .toBlob(blob => {
                                                store.dispatch({
                                                    type: 'UPDATE_SIGNATURE',
                                                    value: blob,
                                                })
                                            })

                                        // store.dispatch({
                                        //     type: 'UPDATE_SIGNATURE',
                                        //     value: canvasRef.current
                                        //         .getTrimmedCanvas()
                                        //         .toDataURL('image/png'),
                                        // })
                                    }}
                                    canvasProps={{
                                        // width: 400,
                                        // height: 200,
                                        className: 'w-full h-36',
                                    }}
                                />
                            </Box>

                            {store.state.signature && (
                                <Box className="pt-2">
                                    <Button
                                        onClick={() => {
                                            canvasRef.current.clear()
                                            store.dispatch({
                                                type: 'UPDATE_SIGNATURE',
                                                value: null,
                                            })
                                        }}
                                        variant="outline"
                                    >
                                        Clear Signature
                                    </Button>
                                </Box>
                            )}

                            {/* {store.state.signature && (
                                <img
                                    src={URL.createObjectURL(
                                        store.state.signature
                                    )}
                                />
                            )} */}
                        </Box>
                    )}

                    <ServerErrorList className="my-4" errors={serverErrors} />

                    <ButtonWrapper className="pb-8">
                        <Button
                            as={Link}
                            href={getStepPage('upload')}
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
                                <>Submit Request for Processing</>
                            )}
                        </Button>
                    </ButtonWrapper>
                </Box>
            </Container>
        </Layout>
    )
}

export default LayoutReview
