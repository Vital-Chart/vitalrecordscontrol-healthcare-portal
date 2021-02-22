import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'
import SignatureCanvas from 'react-signature-canvas'
import { useStore } from '@/lib/store'
import { finishRequest } from '@/lib/api'
import { isTouchDevice } from '@/lib/helpers'
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

export const LayoutReview = ({ children }) => {
    const store = useStore()
    const router = useRouter()
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

    // TODO: Re-enable data checking
    // useEffect(() => {
    //     // Get hospital name from first directory after 'pages' root
    //     const hospital = router.pathname.split('/')[1]

    //     // Redirect to hospital landing page if no tracking number exists
    //     if (!store.state.trackingNumbers && !store.state.uploadedFiles) {
    //         router.push(`/${hospital}`)
    //     }
    // }, [])

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
                            {/* TODO: Update href using `router.pathname` */}
                            <Link
                                href="/pih/patient/form"
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
                            {/* TODO: Show real data using `store.state.trackingNumbers` */}
                            <Text as="span" className="block text-sm font-bold">
                                Tracking Number(s):
                            </Text>{' '}
                            67-192171, 68-150595, 69-156512
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Patient Name:
                            </Text>{' '}
                            {`${store.state.form.PI_PFN} ${store.state.form.PI_PLN} `}
                        </Text>

                        <Text>
                            {/* TODO: Show real data using `store.state.form` */}
                            <Text as="span" className="block text-sm font-bold">
                                Patient DOB:
                            </Text>{' '}
                            3/3/1977
                        </Text>

                        <Text>
                            {/* TODO: Show real data using `store.state.form` */}
                            <Text as="span" className="block text-sm font-bold">
                                Dates of Service:{' '}
                            </Text>
                            Most recent visit
                        </Text>

                        <Text>
                            {/* TODO: Show real data using `store.state.form` */}
                            <Text as="span" className="block text-sm font-bold">
                                Requested Information:{' '}
                            </Text>
                            Medical Records: PERTINENT; Itemized Billing;
                            Radiology Images; Pathology Slides
                        </Text>

                        <Text>
                            {/* TODO: Show real data using `store.state.form` */}
                            <Text as="span" className="block text-sm font-bold">
                                Purpose of Request:{' '}
                            </Text>
                            test
                        </Text>

                        <Text>
                            {/* TODO: Show real data using `store.state.form` */}
                            <Text as="span" className="block text-sm font-bold">
                                Limitations:{' '}
                            </Text>
                            None
                        </Text>

                        <Text>
                            {/* TODO: Show real data using `store.state.form` */}
                            <Text as="span" className="block text-sm font-bold">
                                Phone:{' '}
                            </Text>
                            (858) 254-8585
                        </Text>

                        <Text>
                            {/* TODO: Show real data using `store.state.form` */}
                            <Text as="span" className="block text-sm font-bold">
                                Email:{' '}
                            </Text>
                            dwhite@abtvault.com
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Delivery Method for Records:{' '}
                            </Text>
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Delivery Method for CDs/Slides:{' '}
                            </Text>
                            VitalChart &reg; Virtual ROI Portal. Pick up CDs
                            and/or slides at the facility.
                        </Text>

                        {/* TODO: Update href using `router.pathname` */}
                        <Button
                            as={Link}
                            href="/pih/patient/form"
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

                        {/* TODO: Update href using `router.pathname` */}
                        <Button
                            as={Link}
                            href="/pih/patient/upload"
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
                        {/* TODO: Going to have to do something different (should go back a step, not actual browser back) */}
                        <Button onClick={() => router.back()} variant="outline">
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
