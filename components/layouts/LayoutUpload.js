import { useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { useStore } from '@/lib/store'
import { Layout, Container, ScreenReader } from '@/components/general'
import { Box, Text, Flex, Button, Link } from '@/components/core'
import {
    FormWrapper,
    SectionHeading,
    PageHeading,
    ButtonWrapper,
    UploadsList,
    Stepper,
} from '@/components/atoms'

import IconUpload from '@/icons/icon-upload.svg'
import IconClose from '@/icons/icon-close.svg'

const MicroModal = dynamic(() => import('react-micro-modal'), { ssr: false })

export const LayoutUpload = ({ children }) => {
    const store = useStore()

    const { register } = useForm({
        defaultValues: store.state.form,
    })

    const handleDrop = useCallback(droppedFiles => {
        store.dispatch({
            type: 'ADD_FILES',
            value: droppedFiles,
        })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/jpeg, image/png, image/tiff, .pdf',
    })

    return (
        <Layout>
            <Stepper />
            <Container>
                <Box className="max-w-screen-md space-y-8 pb-8">
                    <PageHeading>Upload Authorization</PageHeading>
                    {children}
                    <Box>
                        <Text className="pb-4 leading-relaxed">
                            <Text as="span" className="font-bold">
                                All requests for medical records require
                                printing out, signing, and uploading an image of
                                this{' '}
                                <Link
                                    href="#"
                                    className="underline font-bold text-blue hover:text-black transition-colors"
                                >
                                    authorization form
                                </Link>
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
                                            <IconClose
                                                onClick={handleClose}
                                                className=""
                                            />
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
                        <Text className="pb-4">To complete your request:</Text>
                        <Box as="ul" className="pl-8 pb-4 list-decimal">
                            <Box as="li" className="pb-2">
                                Print out and sign this authorization form along
                                with a copy of a government-issued picture ID,
                            </Box>
                            <Box as="li" className="pb-2">
                                Scan or photograph all pages of the form along
                                with your government ID,
                            </Box>
                            <Box as="li" className="pb-2">
                                If requesting on behalf of a patient, scan or
                                photograph all pages of the additional required
                                documentation,
                            </Box>
                            <Box as="li" className="pb-2">
                                Upload all photos/scans in the area below, and
                            </Box>
                            <Box as="li" className="pb-2">
                                Click{' '}
                                <Text as="span" className="font-bold">
                                    Continue
                                </Text>{' '}
                                below.
                            </Box>
                        </Box>

                        <Text className="pb-4 font-bold">
                            Please note the following:
                        </Text>

                        <Box as="ul" className="pl-8 pb-4 list-disc">
                            <Box as="li" className="pb-2">
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
                            <Box as="li" className="pb-2">
                                The files you upload must have PDF, JPG/JPEG,
                                TIF/TIFF, or PNG as their extension.
                            </Box>
                            <Box as="li" className="pb-2">
                                Uploaded files must be less than 10 MB in size.
                                If your files are too large, consult your
                                device's documentation for instructions on
                                lowering the resolution and/or color depth and
                                compressing the file.
                            </Box>
                            <Box as="li" className="pb-2">
                                This site will automatically log you out if you
                                are inactive or switch away from your browser to
                                another app for 10 minutes.
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <SectionHeading>
                            Upload Your Documentation Here
                        </SectionHeading>

                        <FormWrapper>
                            <Box {...getRootProps()}>
                                <input
                                    name=""
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    ref={register({
                                        required: true,
                                    })}
                                    {...getInputProps()}
                                />
                                <Box
                                    className={
                                        'w-full p-8 border border-gray-light cursor-pointer ' +
                                        (isDragActive
                                            ? 'bg-gray'
                                            : 'bg-gray-lightest')
                                    }
                                >
                                    <Flex className="items-center justify-center text-center text-gray-dark my-2">
                                        <IconUpload className="w-12 h-auto mr-4" />
                                        <Text className="font-bold">
                                            Drop the files here.
                                        </Text>
                                    </Flex>
                                </Box>
                            </Box>
                        </FormWrapper>

                        {store.state.files && <UploadsList className="mt-8" />}
                    </Box>

                    {/* TODO: Add correct buttons here */}
                    <ButtonWrapper>
                        <Button variant="outline" className="flex-grow">
                            Cancel and Delete Request
                        </Button>
                        <Button
                            as={Link}
                            href="/pih/patient/review"
                            variant="filled"
                            className="flex-grow text-center"
                        >
                            Review and Submit Request
                        </Button>
                    </ButtonWrapper>
                </Box>
            </Container>
        </Layout>
    )
}

export default LayoutUpload
