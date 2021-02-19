import { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
// const DynamicSignatureCanvas = dynamic(() => import('react-signature-canvas'), {
//     ssr: false,
// })
// const SignatureCanvas = forwardRef((props, ref) => (
//     <DynamicSignatureCanvas {...props} ref={ref} />
// ))
import { useStore } from '@/lib/store'
import { isTouchDevice } from '@/lib/helpers'
import { Layout, Container } from '@/components/general'
import { Box, Text, Button, Link } from '@/components/core'
import {
    SectionHeading,
    PageHeading,
    ButtonWrapper,
    UploadsList,
    Stepper,
} from '@/components/atoms'

export const LayoutReview = ({ children }) => {
    const store = useStore()
    const canvasRef = useRef(null)
    const hasTouch = isTouchDevice()

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
                            <Text as="span" className="block text-sm font-bold">
                                Patient DOB:
                            </Text>{' '}
                            3/3/1977
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Dates of Service:{' '}
                            </Text>
                            Most recent visit
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Requested Information:{' '}
                            </Text>
                            Medical Records: PERTINENT; Itemized Billing;
                            Radiology Images; Pathology Slides
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Purpose of Request:{' '}
                            </Text>
                            test
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Limitations:{' '}
                            </Text>
                            None
                        </Text>

                        <Text>
                            <Text as="span" className="block text-sm font-bold">
                                Phone:{' '}
                            </Text>
                            (858) 254-8585
                        </Text>

                        <Text>
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
                            TRIMSNet e-Request Website Pick up CDs and/or slides
                            at the facility.
                        </Text>

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
                            {/* {store.state.signature && (
                                <img
                                    src={URL.createObjectURL(
                                        store.state.signature
                                    )}
                                />
                            )} */}
                        </Box>
                    )}

                    <ButtonWrapper>
                        <Button variant="outline" className="flex-grow">
                            Cancel and Delete Request
                        </Button>

                        <Button variant="filled" className="flex-grow">
                            Submit Request for Processing
                        </Button>
                    </ButtonWrapper>
                </Box>
            </Container>
        </Layout>
    )
}

export default LayoutReview
