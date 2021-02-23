import { useEffect, useState, useRef } from 'react'
import cx from 'classnames'
import * as dayjs from 'dayjs'
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
    ErrorMessage,
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
            const startDate = dayjs(form.VI_DR_SD).format('MM/DD/YYYY')
            const endDate = dayjs(form.VI_DR_ED).format('MM/DD/YYYY')
            return `${startDate} - ${endDate}`
        default:
            return null
    }
}

function displayRequestedInformation(store) {
    const { form } = store.state

    const info = form.RI_CB.map(checkbox => {
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
        getStep,
        goToStep,
        hasUploadAccess,
        hasSubmitAccess,
    } = useNavigation()
    const canvasRef = useRef(null)
    const [errors, setErrors] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const hasTouch = isTouchDevice()

    const handleSubmit = async () => {
        setIsFetching(true)

        try {
            const response = await finishRequest({
                ...store.state.form,
                esig: store.state.signature,
            })

            console.log({ response })

            if (inError) {
                setErrors(errorNumber)
                setIsFetching(false)
            } else {
                setErrors([])
                setIsFetching(false)

                // TODO: Update `store` with value to denote request has been sent,
                // or just wipe state and redirect to success page?
                console.log(`Show request finished message`)
            }
        } catch (error) {
            // General server error
            setErrors([100000])
            setIsFetching(false)
        }
    }

    // Redirect to form/upload step if no tracking number/uploads exist
    useEffect(() => {
        if (!hasUploadAccess) goToStep('form')
        if (!hasSubmitAccess) goToStep('upload')
    }, [hasUploadAccess, hasSubmitAccess])

    if (typeof window === 'undefined' || !hasUploadAccess || !hasSubmitAccess) {
        return null
    }

    return (
        <Layout>
            <Stepper />

            <Container>
                <Box className="max-w-screen-md space-y-8 pb-8">
                    <Box>
                        <PageHeading className="mb-8">
                            Review & Submit
                        </PageHeading>

                        <Text className="leading-relaxed">
                            Please review your submission below for accuracy. If
                            there are any errors,{' '}
                            <Link
                                href={getStep('form')}
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
                            {store.state.trackingNumbers.join(', ')}
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
                            {dayjs(store.state.form.PI_DOB).format(
                                'MM/DD/YYYY'
                            )}
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
                            {displayDeliveryMethod(store)}
                        </Text>

                        <Button
                            as={Link}
                            href={getStep('form')}
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
                            href={getStep('upload')}
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

                            {/* TODO: Handle showing server/upload/finish errors */}
                            {errors.length > 0 && (
                                <ErrorMessage
                                    message="There are errors on the page..."
                                    className="mt-4 pb-0"
                                />
                            )}
                        </Box>
                    )}

                    <ButtonWrapper>
                        <Button
                            as={Link}
                            href={getStep('upload')}
                            variant="outline"
                        >
                            Go Back
                        </Button>

                        {/* TODO: Send delete request call? Navigate back to hospital landing page */}
                        <Button variant="outline">
                            Cancel and Delete Request
                        </Button>

                        <Button
                            variant="filled"
                            disabled={isFetching}
                            className={cx(
                                'flex-grow',
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
