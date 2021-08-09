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
    Radio,
    Select,
    Label,
    Input,
    Flex,
    Button,
    Link,
    Heading,
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
    FacilityAddress,
    ContinuedRequestAlert,
} from '@/components/atoms'
import {
    FacilitySelector,
    FormMeta,
    PatientName,
    PatientOtherNames,
    PatientDOB,
    PhysicianClinic,
    VisitOptions,
    RequestPurpose,
} from '@/components/sections'

import IconQuestion from '@/icons/icon-question.svg'
import IconClose from '@/icons/icon-close.svg'
import IconLoading from '@/icons/icon-loading.svg'

const Form = ({ store }) => {
    const { getLandingPage, goToStep, getContactPage, hospital } =
        useNavigation()

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

    const watchRecordDeliveryMethod = watch('DI_DM_DD', [])
    const watchRequestedInformation = watch('RI_CB', [])
    const watchRelationshipToPatient = watch('YI_REL_DD', '')
    const watchIPMInitials = watch('RI_MR_AI_CB_TXT_IPM', '')
    const watchIPDInitials = watch('RI_MR_AI_CB_TXT_IPD', '')
    const watchGTIInitials = watch('RI_MR_AI_CB_TXT_GTI', '')
    const watchHIVInitials = watch('RI_MR_AI_CB_TXT_HIV', '')
    const watchWCIInitials = watch('RI_MR_AI_CB_TXT_WCI', '')

    const facility = hospitals[hospital].facilities[0]

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

    useEffect(() => {
        const authorizedInfo = [
            watchIPMInitials.trim().length > 0 ? 'IPM' : '',
            watchIPDInitials.trim().length > 0 ? 'IPD' : '',
            watchGTIInitials.trim().length > 0 ? 'GTI' : '',
            watchHIVInitials.trim().length > 0 ? 'HIV' : '',
            watchWCIInitials.trim().length > 0 ? 'WCI' : '',
        ].filter(el => el !== '')

        setValue('RI_MR_AI_CB', authorizedInfo)
    }, [
        watchIPMInitials,
        watchIPDInitials,
        watchGTIInitials,
        watchHIVInitials,
        watchWCIInitials,
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
            const { trackingNumbers, errorInformation, inError } =
                await createRequest(store.state.form)

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
                            <PatientOtherNames />
                            <PatientDOB />
                            <PhysicianClinic />
                            <VisitOptions />
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <Box as="fieldset">
                                <Box as="legend" className="mb-2">
                                    Please select the type of information you
                                    would like released:
                                </Box>
                                <CheckboxWrapper>
                                    <Checkbox
                                        label="Medical Records"
                                        name="RI_CB.0"
                                        value="MR"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select the items you would like released.',
                                        })}
                                    />
                                    {errors.RI_CB && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.RI_CB.message}
                                        />
                                    )}

                                    {errors.RI_MR_OPT && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.RI_MR_OPT.message}
                                        />
                                    )}
                                </CheckboxWrapper>

                                {watchRequestedInformation.length > 0 && (
                                    <Box className="mt-4 pl-4">
                                        <Flex className="flex-col items-start ml-4">
                                            <Radio
                                                label="Pertinent Information (Discharge Summary, History and Physical, Consultation, ER Reports, Labs, Radiology Reports, EKGs, Pathology Reports)"
                                                name="RI_MR_OPT"
                                                value="PI"
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please select the items you would like released.',
                                                })}
                                            />
                                            <Radio
                                                label="All health information pertaining to my medical history, mental or physical condition and treatment received, including records received from other healthcare providers. A reasonable clerical and reproduction processing fee is applicable."
                                                name="RI_MR_OPT"
                                                value="AHI"
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please select the items you would like released.',
                                                })}
                                            />
                                            <Radio
                                                label="Only the following records or types of health information included in the following dates of service:"
                                                name="RI_MR_OPT"
                                                value="FR"
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please select the items you would like released.',
                                                })}
                                            />
                                            <Flex className="pl-8 flex-col md:flex-row">
                                                <CheckboxWrapper className="w-full">
                                                    <Checkbox
                                                        labelClassName="mb-2"
                                                        label="Emergency/Urgent Care Physician Report"
                                                        name="RI_MR_FR_CB"
                                                        value="EUR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Checkbox
                                                        labelClassName="mb-2"
                                                        label="Consultation Report"
                                                        name="RI_MR_FR_CB"
                                                        value="CR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Checkbox
                                                        labelClassName="mb-2"
                                                        label="Laboratory Reports"
                                                        name="RI_MR_FR_CB"
                                                        value="LR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Checkbox
                                                        labelClassName="mb-2"
                                                        label="Newborn Record"
                                                        name="RI_MR_FR_CB"
                                                        value="NR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Checkbox
                                                        labelClassName="mb-2"
                                                        label="History and Physical Report"
                                                        name="RI_MR_FR_CB"
                                                        value="HPR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Checkbox
                                                        label="Operative Report"
                                                        name="RI_MR_FR_CB"
                                                        value="OR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                </CheckboxWrapper>
                                                <CheckboxWrapper className="w-full">
                                                    <Checkbox
                                                        labelClassName="mb-2"
                                                        label="Pathology Report"
                                                        name="RI_MR_FR_CB"
                                                        value="PR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Checkbox
                                                        labelClassName="mb-2"
                                                        label="Immunization Record"
                                                        name="RI_MR_FR_CB"
                                                        value="IR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />

                                                    <Checkbox
                                                        labelClassName="mb-2"
                                                        label="Discharge Summary Report"
                                                        name="RI_MR_FR_CB"
                                                        value="DSR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Checkbox
                                                        labelClassName="mb-2"
                                                        label="Anesthesia Records"
                                                        name="RI_MR_FR_CB"
                                                        value="AR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Checkbox
                                                        labelClassName="mb-2"
                                                        label="Radiology Report/Image"
                                                        name="RI_MR_FR_CB"
                                                        value="RR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Checkbox
                                                        label="Therapy Records"
                                                        name="RI_MR_FR_CB"
                                                        value="TR"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                </CheckboxWrapper>
                                            </Flex>
                                        </Flex>

                                        {errors.RI_CB && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={errors.RI_CB.message}
                                            />
                                        )}

                                        <Box className="mt-4">
                                            <Text className="max-w-lg text-sm font-bold mb-4">
                                                The following information will
                                                not be released unless
                                                specifically authorized by
                                                typing your initials in the
                                                relevant box(es) below. DO NOT
                                                fill in your initials, unless
                                                you want the below records
                                                released.
                                            </Text>
                                            <Box className="pl-4">
                                                <Input
                                                    type="hidden"
                                                    name="RI_MR_AI_CB"
                                                    onChange={handleChange}
                                                    ref={register}
                                                />
                                                <Flex className="items-start sm:items-center mb-4">
                                                    <Input
                                                        type="text"
                                                        name="RI_MR_AI_CB_TXT_IPM"
                                                        id="RI_MR_AI_CB_TXT_IPM"
                                                        className="mr-2 w-16"
                                                        maxLength="3"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Label htmlFor="RI_MR_AI_CB_TXT_IPM">
                                                        Information pertaining
                                                        to mental health
                                                        diagnosis or treatment
                                                    </Label>
                                                </Flex>

                                                <Flex className="items-start sm:items-center mb-4">
                                                    <Input
                                                        type="text"
                                                        name="RI_MR_AI_CB_TXT_IPD"
                                                        id="RI_MR_AI_CB_TXT_IPD"
                                                        className="mr-2 w-16"
                                                        maxLength="3"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Label htmlFor="RI_MR_AI_CB_TXT_IPD">
                                                        Information pertaining
                                                        to drug and alcohol
                                                        abuse, diagnosis, or
                                                        treatment
                                                    </Label>
                                                </Flex>

                                                <Flex className="items-start sm:items-center mb-4">
                                                    <Input
                                                        type="text"
                                                        name="RI_MR_AI_CB_TXT_HIV"
                                                        id="RI_MR_AI_CB_TXT_HIV"
                                                        className="mr-2 w-16"
                                                        maxLength="3"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Label htmlFor="RI_MR_AI_CB_TXT_HIV">
                                                        HIV/AIDS test results
                                                    </Label>
                                                </Flex>

                                                <Flex className="items-start sm:items-center mb-4">
                                                    <Input
                                                        type="text"
                                                        name="RI_MR_AI_CB_TXT_GTI"
                                                        id="RI_MR_AI_CB_TXT_GTI"
                                                        className="mr-2 w-16"
                                                        maxLength="3"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Label htmlFor="RI_MR_AI_CB_TXT_GTI">
                                                        Genetic testing
                                                        information
                                                    </Label>
                                                </Flex>

                                                <Flex className="items-start sm:items-center mb-4">
                                                    <Input
                                                        type="text"
                                                        name="RI_MR_AI_CB_TXT_WCI"
                                                        id="RI_MR_AI_CB_TXT_WCI"
                                                        className="mr-2 w-16"
                                                        maxLength="3"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                    <Label htmlFor="RI_MR_AI_CB_TXT_WCI">
                                                        Worker's Comp
                                                        information
                                                    </Label>
                                                </Flex>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>Purpose of Request</SectionHeading>
                            <RequestPurpose includeLimitations={true} />
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
                                <Label htmlFor="YI_EM" className="italic">
                                    Email Address (Optional)
                                </Label>
                                <Input
                                    type="email"
                                    name="YI_EM"
                                    id="YI_EM"
                                    autoComplete="email"
                                    className="w-full mt-1"
                                    onChange={handleChange}
                                    ref={register}
                                />
                            </Box>
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>
                                Delivery Information
                            </SectionHeading>

                            <Box className="p-8 mb-6 bg-gray-lightest">
                                <Heading as="h3" variant="h5">
                                    Medical Records Delivery Options
                                </Heading>
                                <Text className="mb-4">
                                    Please choose from one of the below options
                                    for Medical Records. You can download them
                                    directly from the website, or have them
                                    created on CD to be delivered by mail via
                                    the US Postal Service to the address entered
                                    below, or Picked up at the Medical Facility.
                                </Text>
                                <Box className="mb-4">
                                    <Label htmlFor="DI_DM_DD">
                                        Desired Delivery Option:
                                    </Label>
                                    <Select
                                        name="DI_DM_DD"
                                        id="DI_DM_DD"
                                        className="block mt-1"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select a delivery option.',
                                        })}
                                    >
                                        <option value="DL">
                                            Download from Website
                                        </option>
                                        <option value="PS">
                                            CD via US Postal Service
                                        </option>
                                        <option value="PU">
                                            CD for On-Site Pickup
                                        </option>
                                    </Select>
                                    {errors.DI_DM_DD && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.DI_DM_DD.message}
                                        />
                                    )}
                                </Box>
                            </Box>

                            {watchRecordDeliveryMethod === 'PS' && (
                                <Box>
                                    <Box className="mb-4">
                                        <Label htmlFor="DI_NM">Name</Label>
                                        <Input
                                            type="text"
                                            name="DI_NM"
                                            id="DI_NM"
                                            className="w-full mt-1"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please enter a name.',
                                            })}
                                        />
                                        {errors.DI_NM && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={errors.DI_NM.message}
                                            />
                                        )}
                                    </Box>

                                    <Box className="mb-4">
                                        <Label htmlFor="DI_ADDR1">
                                            Address
                                        </Label>
                                        <Input
                                            type="text"
                                            name="DI_ADDR1"
                                            id="DI_ADDR1"
                                            className="w-full mt-1 mb-2"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please enter an address.',
                                            })}
                                        />
                                        {errors.DI_ADDR1 && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={
                                                    errors.DI_ADDR1.message
                                                }
                                            />
                                        )}
                                    </Box>

                                    <Box className="mb-4">
                                        <Label htmlFor="DI_ADDR2">
                                            Address Line 2
                                        </Label>
                                        <Input
                                            type="text"
                                            name="DI_ADDR2"
                                            id="DI_ADDR2"
                                            className="w-full mt-1  mb-2"
                                            onChange={handleChange}
                                            ref={register}
                                        />
                                    </Box>

                                    <Box className="mb-4">
                                        <Label htmlFor="DI_CITY">City</Label>
                                        <Input
                                            type="text"
                                            name="DI_CITY"
                                            id="DI_CITY"
                                            className="w-full mt-1 mb-2"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please enter a city.',
                                            })}
                                        />

                                        {errors.DI_CITY && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={errors.DI_CITY.message}
                                            />
                                        )}
                                    </Box>

                                    <Flex className="flex-col sm:flex-row">
                                        <Box className="mb-4">
                                            <Label htmlFor="DI_ST_DD">
                                                State
                                            </Label>
                                            <Select
                                                name="DI_ST_DD"
                                                id="DI_ST_DD"
                                                className="block mt-1 mr-4"
                                                onChange={handleChange}
                                                ref={register({
                                                    validate: {
                                                        stateCheck: value =>
                                                            value !==
                                                                'Select a state' ||
                                                            'Please select a state.',
                                                    },
                                                })}
                                            >
                                                <option>Select a state</option>
                                                {Object.keys(states).map(
                                                    key => (
                                                        <option
                                                            value={key}
                                                            key={key}
                                                        >
                                                            {states[key]}
                                                        </option>
                                                    )
                                                )}
                                            </Select>

                                            {errors.DI_ST_DD && (
                                                <ErrorMessage
                                                    className="mt-2"
                                                    message={
                                                        errors.DI_ST_DD.message
                                                    }
                                                />
                                            )}
                                        </Box>
                                        <Box className="mb-4">
                                            <Label htmlFor="DI_ZIP">Zip</Label>
                                            <Input
                                                type="text"
                                                name="DI_ZIP"
                                                id="DI_ZIP"
                                                className="w-full mt-1"
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please enter a zip code.',
                                                })}
                                            />

                                            {errors.DI_ZIP && (
                                                <ErrorMessage
                                                    className="mt-2"
                                                    message={
                                                        errors.DI_ZIP.message
                                                    }
                                                />
                                            )}
                                        </Box>
                                    </Flex>
                                    <Box className="mb-4">
                                        <Label htmlFor="DI_FAX">
                                            Phone or Fax Number
                                        </Label>
                                        <Input
                                            type="tel"
                                            name="DI_FAX"
                                            id="DI_FAX"
                                            className="w-full mt-1 mb-2"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please enter a fax number.',
                                                pattern: {
                                                    value: regexPatterns.phone,
                                                    message:
                                                        'Please enter a valid fax number.',
                                                },
                                            })}
                                        />
                                        {errors.DI_FAX && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={errors.DI_FAX.message}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </FormSection>

                        <FormSection>
                            <SectionHeading>Delivery Summary</SectionHeading>

                            <Box
                                as="ul"
                                className="pl-8 mb-8 space-y-2 list-disc"
                            >
                                {watchRecordDeliveryMethod === 'DL' && (
                                    <Box as="li">
                                        Medical records and/or billing items
                                        will be delivered via this website in
                                        Adobe PDF format. A notification will be
                                        sent when the records are ready for
                                        download, and they will be available for
                                        60 days.
                                    </Box>
                                )}

                                {watchRecordDeliveryMethod === 'PS' && (
                                    <Box as="li">
                                        Medical records and/or billing items
                                        will be mailed to the address you
                                        entered above via the US Postal Service.
                                    </Box>
                                )}
                                {watchRecordDeliveryMethod === 'PU' && (
                                    <Box as="li">
                                        Once ready, medical records and/or
                                        billing items can be picked up from the
                                        facility listed below.
                                    </Box>
                                )}

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

                            {watchRecordDeliveryMethod === 'PU' && (
                                <Box className="p-8 mb-4 space-y-4 bg-gray-lightest">
                                    <Text>
                                        Once available, records can be picked up
                                        from the facility or facilities listed
                                        below.
                                    </Text>

                                    <FacilityAddress
                                        key={facility.id}
                                        facility={facility}
                                    />
                                </Box>
                            )}
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
