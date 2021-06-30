import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import cx from 'classnames'
const MicroModal = dynamic(() => import('react-micro-modal'), { ssr: false })
import { useForm, FormProvider } from 'react-hook-form/dist/index.ie11'
import { withStore } from '@/lib/store'
import { createRequest } from '@/lib/api'
import { regexPatterns, states } from '@/lib/helpers'
import hospitals from '@/lib/hospitals'
import useNavigation from '@/lib/useNavigation'
import { Layout, Container, ScreenReader } from '@/components/general'
import {
    Box,
    Text,
    Checkbox,
    Select,
    Label,
    Input,
    Flex,
    Button,
    Link,
} from '@/components/core'
import {
    FormSection,
    SectionHeading,
    PageHeading,
    CheckboxWrapper,
    ErrorMessage,
    ButtonWrapper,
    Stepper,
    ServerErrorList,
    ContinuedRequestAlert,
} from '@/components/atoms'
import {
    FacilitySelector,
    FormMeta,
    PatientName,
    PatientDOB,
} from '@/components/sections'

import IconQuestion from '@/icons/icon-question.svg'
import IconClose from '@/icons/icon-close.svg'
import IconLoading from '@/icons/icon-loading.svg'

const Form = ({ store }) => {
    const {
        getLandingPage,
        goToStep,
        getContactPage,
        hospital,
    } = useNavigation()

    const methods = useForm({ defaultValues: store.state.form })
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        reset,
        errors,
    } = methods

    const [serverErrors, setServerErrors] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const watchRelationshipToPatient = watch('YI_REL_DD', '')

    useEffect(() => {
        if (Object.keys(store.state.form).length === 0) {
            reset({})
        }
    }, [store.state.form])

    useEffect(() => {
        if (watchRelationshipToPatient === 'SELF') {
            setValue(
                'YI_REL_NM',
                `${store.state.form.PI_PFN || ''} ${
                    store.state.form.PI_PLN || ''
                }`
            )
        } else {
            setValue('YI_REL_NM', '')
        }
    }, [
        watchRelationshipToPatient,
        store.state.form.PI_PFN,
        store.state.form.PI_PLN,
    ])

    const handleChange = e => {
        setServerErrors([])

        store.dispatch({
            type: 'UPDATE_FORM',
            value: getValues(),
        })
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()

        setServerErrors([])
        setIsFetching(true)

        try {
            const {
                trackingNumbers,
                errorInformation,
                inError,
            } = await createRequest(store.state.form)

            if (inError) {
                setServerErrors(
                    errorInformation.map(error => error.errorNumber)
                )
                setIsFetching(false)
            } else {
                store.dispatch({
                    type: 'UPDATE_TRACKING_NUMBER',
                    value: trackingNumbers,
                })

                setIsFetching(false)

                // Redirect to next step
                goToStep('upload')
            }
        } catch (error) {
            // General server error
            setServerErrors([100000])
            setIsFetching(false)
        }
    }

    return (
        <Layout>
            <Stepper />
            <Container>
                <ContinuedRequestAlert />
                <PageHeading className="mt-8">
                    <Text
                        as="span"
                        className="block pb-1 text-base md:text-lg font-normal text-gray-dark"
                    >
                        Quick Release to You
                    </Text>{' '}
                    New Medical Records Request
                </PageHeading>

                <FormProvider handleChange={handleChange} {...methods}>
                    <Box
                        as="form"
                        acceptCharset="UTF-8"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormMeta />
                        <FacilitySelector />

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>Patient Information</SectionHeading>

                            <PatientName />
                            <PatientDOB />
                            <Input
                                type="hidden"
                                name="VI_OPT"
                                value="All"
                                ref={register}
                            />
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>
                                Requested Information
                            </SectionHeading>
                            <Text>All medical records will be provided</Text>

                            <CheckboxWrapper className="mt-4">
                                <Checkbox
                                    labelClassName="hidden"
                                    checked
                                    name="RI_CB"
                                    value="MR"
                                    onChange={handleChange}
                                    ref={register}
                                />
                                <Checkbox
                                    label="Include visits from today or yesterday?"
                                    name="RI_CB"
                                    value="VSTY"
                                    onChange={handleChange}
                                    ref={register}
                                >
                                    May delay processing by 2 days.
                                </Checkbox>
                            </CheckboxWrapper>

                            <Input
                                type="hidden"
                                name="RI_MR_OPT"
                                value="AHI"
                                ref={register}
                            />
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>Your Information</SectionHeading>

                            <Flex className="flex-col sm:flex-row">
                                <Box className="mr-4 mb-4">
                                    <Label htmlFor="YI_REL_DD">
                                        Relationship to Patient
                                    </Label>
                                    <Select
                                        name="YI_REL_DD"
                                        id="YI_REL_DD"
                                        className="block mt-1"
                                        onChange={handleChange}
                                        ref={register({ required: true })}
                                    >
                                        <option value="SELF">Self</option>
                                        <option value="PG">
                                            Parent/Guardian
                                        </option>
                                        <option value="CON">Conservator</option>
                                    </Select>
                                </Box>
                                <Box className="flex-grow mb-4">
                                    <Label htmlFor="YI_REL_NM">Name</Label>
                                    <Input
                                        type="text"
                                        name="YI_REL_NM"
                                        id="YI_REL_NM"
                                        autoComplete="name"
                                        className="w-full mt-1"
                                        onChange={handleChange}
                                        ref={register({
                                            required: 'Please enter your name.',
                                        })}
                                    />
                                    {errors.YI_REL_NM && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.YI_REL_NM.message}
                                        />
                                    )}
                                </Box>
                            </Flex>
                            <Box className="mb-4">
                                <Flex className="items-center">
                                    <Label htmlFor="YI_NOTICE_DD">
                                        Preferred Notification Method
                                    </Label>
                                    <MicroModal
                                        trigger={handleOpen => (
                                            <Button
                                                onClick={handleOpen}
                                                className="ml-2"
                                            >
                                                <IconQuestion className="h-5 w-5 text-blue cursor-pointer" />
                                            </Button>
                                        )}
                                        children={handleClose => (
                                            <Box className="p-8 relative">
                                                <Button
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
                                                </Button>

                                                <Box>
                                                    <Text className="text-xl font-bold">
                                                        Preferred Notification
                                                        Method
                                                    </Text>

                                                    <Text>
                                                        This is the method by
                                                        which you would like to
                                                        receive automatic
                                                        notifications of the
                                                        progress of your
                                                        request(s), as well as
                                                        how you will receive
                                                        password updates from
                                                        this website. If we have
                                                        specific questions about
                                                        your request, we will
                                                        call you at the phone
                                                        number listed.
                                                    </Text>
                                                </Box>
                                            </Box>
                                        )}
                                    />
                                </Flex>

                                <Select
                                    name="YI_NOTICE_DD"
                                    id="YI_NOTICE_DD"
                                    className="block w-full mt-1"
                                    onChange={handleChange}
                                    ref={register({ required: true })}
                                >
                                    <option value="TEXT">
                                        Text Message (Standard rates may apply.)
                                    </option>
                                    <option value="EMAIL">Email</option>
                                </Select>
                            </Box>

                            <Flex className="flex-col sm:flex-row">
                                <Box className="mb-4 sm:mr-4">
                                    <Label htmlFor="YI_PN">Phone Number</Label>
                                    <Input
                                        type="tel"
                                        name="YI_PN"
                                        id="YI_PN"
                                        autoComplete="tel"
                                        className="w-full mt-1"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please enter your phone number.',
                                            pattern: {
                                                value: regexPatterns.phone,
                                                message:
                                                    'Please enter a valid phone number.',
                                            },
                                        })}
                                    />
                                    {errors.YI_PN && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.YI_PN.message}
                                        />
                                    )}
                                </Box>
                                <Box className="mb-4">
                                    <Label htmlFor="YI_PHT_DD">Type</Label>
                                    <Select
                                        name="YI_PHT_DD"
                                        className="w-full mt-1"
                                        onChange={handleChange}
                                        ref={register({
                                            validate: {
                                                phoneTypeCheck: value =>
                                                    value !==
                                                        'Select phone type' ||
                                                    'Please select a phone type.',
                                            },
                                        })}
                                    >
                                        <option defaultValue disabled>
                                            Select phone type
                                        </option>
                                        <option key="mobile" value="MOBILE">
                                            Mobile
                                        </option>
                                        <option key="home" value="HOME">
                                            Home
                                        </option>
                                        <option key="work" value="WORK">
                                            Work
                                        </option>
                                    </Select>
                                    {errors.YI_PHT_DD && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.YI_PHT_DD.message}
                                        />
                                    )}
                                </Box>
                            </Flex>

                            <Box className="mb-4">
                                <Label htmlFor="YI_PHC">
                                    Retype Phone Number
                                </Label>
                                <Input
                                    type="tel"
                                    name="YI_PHC"
                                    id="YI_PHC"
                                    autoComplete="tel"
                                    className="w-full mt-1"
                                    onChange={handleChange}
                                    ref={register({
                                        required:
                                            'Please confirm your phone number.',
                                        validate: {
                                            phoneMatch: value =>
                                                value === getValues('YI_PN') ||
                                                'The phone numbers you entered do not match!',
                                        },
                                    })}
                                />
                                {errors.YI_PHC && (
                                    <ErrorMessage
                                        className="mt-2"
                                        message={errors.YI_PHC.message}
                                    />
                                )}
                            </Box>
                            <Box className="mb-4">
                                <Label htmlFor="YI_EM">Email Address</Label>
                                <Input
                                    type="email"
                                    name="YI_EM"
                                    id="YI_EM"
                                    autoComplete="email"
                                    className="w-full mt-1"
                                    onChange={handleChange}
                                    ref={register({
                                        required:
                                            'Please enter your email address.',
                                    })}
                                />
                                {errors.YI_EM && (
                                    <ErrorMessage
                                        className="mt-2"
                                        message={errors.YI_EM.message}
                                    />
                                )}
                            </Box>
                            <Box className="mb-4">
                                <Label htmlFor="YI_EMC">
                                    Retype Email Address
                                </Label>
                                <Input
                                    type="email"
                                    name="YI_EMC"
                                    id="YI_EMC"
                                    autoComplete="email"
                                    className="w-full mt-1"
                                    onChange={handleChange}
                                    ref={register({
                                        required:
                                            'Please confirm your email address.',
                                        validate: {
                                            emailMatch: value =>
                                                value === getValues('YI_EM') ||
                                                'The email addresses you entered do not match.',
                                        },
                                    })}
                                />
                                {errors.YI_EMC && (
                                    <ErrorMessage
                                        className="mt-2"
                                        message={errors.YI_EMC.message}
                                    />
                                )}
                            </Box>
                        </FormSection>

                        <FormSection>
                            <SectionHeading>Delivery Summary</SectionHeading>
                            <Input
                                type="hidden"
                                name="DI_DM_DD"
                                value="DL"
                                ref={register}
                            />

                            <Box
                                as="ul"
                                className="pl-8 mb-8 space-y-2 list-disc"
                            >
                                <Box as="li">
                                    All records will be delivered via this
                                    website in Adobe PDF format. A notification
                                    will be sent when the records are ready for
                                    download, and they will be available for 30
                                    days.
                                </Box>
                                <Box as="li">
                                    Normal processing time is{' '}
                                    {hospitals[hospital].processingTime ||
                                        '5-7 business days'}{' '}
                                    from time of receipt.
                                </Box>
                                <Box as="li">
                                    Please{' '}
                                    <Link
                                        href={getContactPage()}
                                        className="underline font-bold text-blue hover:text-black transition-colors"
                                    >
                                        contact us
                                    </Link>{' '}
                                    if you have any questions.
                                </Box>
                            </Box>
                        </FormSection>

                        <ServerErrorList
                            className="my-4"
                            errors={serverErrors}
                        />

                        <ButtonWrapper className="pb-8">
                            <Button
                                as={Link}
                                href={getLandingPage()}
                                variant="outline"
                                className="flex-1 m-2"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="filled"
                                disabled={isFetching}
                                className={cx(
                                    'flex-1 m-2',
                                    isFetching && 'pointer-events-none'
                                )}
                            >
                                {isFetching ? (
                                    <IconLoading className="w-6 text-gray-400 animate-spin" />
                                ) : (
                                    <>Continue</>
                                )}
                            </Button>
                        </ButtonWrapper>
                    </Box>
                </FormProvider>
            </Container>
        </Layout>
    )
}

export default withStore(Form)
