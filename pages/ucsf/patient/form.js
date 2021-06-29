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
    Textarea,
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

    const watchRequestedInformation = watch('RI_CB', [])
    const watchRelationshipToPatient = watch('YI_REL_DD', '')
    const watchRecordDeliveryMethod = watch('DI_DM_DD', [])
    const watchRPDeliveryMethod = watch('DI_DMRP_OPT', [])

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
                            <VisitOptions forceDateRange={true} />
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <Box as="fieldset">
                                <Box as="legend" className="mb-2">
                                    Please select the type of information you
                                    would like released:
                                </Box>
                                <CheckboxWrapper>
                                    <Checkbox
                                        labelClassName="mb-2"
                                        label="Emergency Room Visit"
                                        name="RI_CB"
                                        value="ERV"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select the items you would like released.',
                                        })}
                                    >
                                        (i.e. ED provider notes, radiology
                                        reports, lab and diagnostic, consults
                                        and procedure notes)
                                    </Checkbox>
                                    <Checkbox
                                        labelClassName="mb-2"
                                        label="Entire Hospital Record"
                                        name="RI_CB"
                                        value="EHR"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select the items you would like released.',
                                        })}
                                    >
                                        (i.e. History and physical, consult,
                                        operative report, discharge summary,
                                        lab, radiology reports, nursing notes,
                                        progress notes)
                                    </Checkbox>
                                    <Checkbox
                                        labelClassName="mb-2"
                                        label="Clinic or Office Visit"
                                        name="RI_CB"
                                        value="COV"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select the items you would like released.',
                                        })}
                                    >
                                        (i.e. Progress notes, office notes,
                                        procedure notes, operative notes, lab,
                                        diagnostic and radiology reports)
                                    </Checkbox>
                                    <Checkbox
                                        labelClassName="mb-2"
                                        label="Billing Records"
                                        name="RI_CB"
                                        value="BR"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select the items you would like released.',
                                        })}
                                    />
                                    <Checkbox
                                        labelClassName="mb-2"
                                        label="Radiology Images (only)"
                                        name="RI_CB"
                                        value="RI"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select the items you would like released.',
                                        })}
                                    />
                                    <Checkbox
                                        labelClassName="mb-2"
                                        label="Reproductive Health (family planning , infertility)"
                                        name="RI_CB"
                                        value="RH"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select the items you would like released.',
                                        })}
                                    />
                                    <Checkbox
                                        label="Other Records"
                                        name="RI_CB"
                                        value="OR"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select the items you would like released.',
                                        })}
                                    />
                                </CheckboxWrapper>
                                {watchRequestedInformation.includes('OR') && (
                                    <Box className="mt-4">
                                        <Label htmlFor="RI_CB_OR">
                                            Specify Other Records:
                                        </Label>
                                        <Textarea
                                            name="RI_CB_OR"
                                            id="RI_CB_OR"
                                            className="block w-full mt-1 mb-2 sm:text-sm border-gray-dark rounded"
                                            placeholder="Examples: Patient Request, Continuity of Care, Billing/Payment, etc."
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please specify the records you would like released.',
                                            })}
                                        />
                                        {errors.RI_CB_OR && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={
                                                    errors.RI_CB_OR.message
                                                }
                                            />
                                        )}
                                    </Box>
                                )}

                                {errors.RI_CB && (
                                    <ErrorMessage
                                        className="mt-2"
                                        message={errors.RI_CB.message}
                                    />
                                )}

                                <Box className="mt-4">
                                    <Text className="max-w-lg text-sm font-bold mb-2">
                                        The following information will not be
                                        released unless specifically authorized
                                        by checking the relevant box(es) below:
                                    </Text>
                                    <CheckboxWrapper>
                                        <Checkbox
                                            labelClassName="mb-2"
                                            name="RI_MR_AI_CB"
                                            label="Information pertaining to mental health diagnosis or treatment"
                                            value="IPM"
                                            onChange={handleChange}
                                            ref={register}
                                        />
                                        <Checkbox
                                            labelClassName="mb-2"
                                            name="RI_MR_AI_CB"
                                            label="Information pertaining to drug and alcohol abuse, diagnosis, or treatment"
                                            value="IPD"
                                            onChange={handleChange}
                                            ref={register}
                                        />
                                        <Checkbox
                                            labelClassName="mb-2"
                                            name="RI_MR_AI_CB"
                                            label="HIV/AIDS test results"
                                            value="HIV"
                                            onChange={handleChange}
                                            ref={register}
                                        />
                                        <Checkbox
                                            labelClassName="mb-2"
                                            name="RI_MR_AI_CB"
                                            label="Genetic testing information"
                                            value="GTI"
                                            onChange={handleChange}
                                            ref={register}
                                        />
                                        <Checkbox
                                            name="RI_MR_AI_CB"
                                            label="Worker's Comp information"
                                            value="WCI"
                                            onChange={handleChange}
                                            ref={register}
                                        />
                                    </CheckboxWrapper>
                                </Box>
                            </Box>
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>Purpose of Request</SectionHeading>
                            <RequestPurpose />
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
                                    <option value="text">
                                        Text Message (Standard rates may apply.)
                                    </option>
                                    <option value="email">Email</option>
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
                                        <option key="mobile" value="mobile">
                                            Mobile
                                        </option>
                                        <option key="home" value="home">
                                            Home
                                        </option>
                                        <option key="work" value="work">
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

                            <Box className="mb-4">
                                <Label htmlFor="YI_ADDR1">Address</Label>
                                <Input
                                    type="text"
                                    name="YI_ADDR1"
                                    id="YI_ADDR1"
                                    className="w-full mt-1  mb-2"
                                    onChange={handleChange}
                                    ref={register({
                                        required: 'Please enter an address.',
                                    })}
                                />

                                {errors.YI_ADDR1 && (
                                    <ErrorMessage
                                        className="mt-2"
                                        message={errors.YI_ADDR1.message}
                                    />
                                )}
                            </Box>

                            <Box className="mb-4">
                                <Label htmlFor="YI_ADDR2">Address Line 2</Label>
                                <Input
                                    type="text"
                                    name="YI_ADDR2"
                                    id="YI_ADDR2"
                                    className="w-full mt-1  mb-2"
                                    onChange={handleChange}
                                    ref={register}
                                />
                            </Box>

                            <Box className="mb-4">
                                <Label htmlFor="YI_CITY">City</Label>
                                <Input
                                    type="text"
                                    name="YI_CITY"
                                    id="YI_CITY"
                                    className="w-full mt-1 mb-2"
                                    onChange={handleChange}
                                    ref={register({
                                        required: 'Please enter a city.',
                                    })}
                                />

                                {errors.YI_CITY && (
                                    <ErrorMessage
                                        className="mt-2"
                                        message={errors.YI_CITY.message}
                                    />
                                )}
                            </Box>
                            <Flex className="mb-6">
                                <Box>
                                    <Label htmlFor="YI_ST_DD">State</Label>
                                    <Select
                                        name="YI_ST_DD"
                                        id="YI_ST_DD"
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
                                        {Object.keys(states).map(key => (
                                            <option value={key} key={key}>
                                                {states[key]}
                                            </option>
                                        ))}
                                    </Select>

                                    {errors.YI_ST_DD && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.YI_ST_DD.message}
                                        />
                                    )}
                                </Box>
                                <Box>
                                    <Label htmlFor="YI_ZIP">Zip</Label>
                                    <Input
                                        type="text"
                                        name="YI_ZIP"
                                        id="YI_ZIP"
                                        className="w-full mt-1"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please enter a zip code.',
                                        })}
                                    />

                                    {errors.YI_ZIP && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.YI_ZIP.message}
                                        />
                                    )}
                                </Box>
                            </Flex>
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>
                                Delivery Information
                            </SectionHeading>

                            {watchRequestedInformation.length === 0 && (
                                <Text>
                                    Delivery options will appear here once
                                    you've selected the records you'd like to
                                    receive.
                                </Text>
                            )}

                            {watchRequestedInformation.some(i =>
                                [
                                    'ERV',
                                    'EHR',
                                    'COV',
                                    'BR',
                                    'OR',
                                    'RH',
                                ].includes(i)
                            ) && (
                                <Box className="p-8 mb-6 bg-gray-lightest">
                                    <Heading as="h3" variant="h5">
                                        Medical Records Delivery Options
                                    </Heading>
                                    <Text className="mb-4">
                                        There are three delivery options for
                                        Medical Records. You can download them
                                        directly from the website, or have them
                                        created on CD to be delivered by mail
                                        via the US Postal Service to the address
                                        entered above, or Picked up at the
                                        Medical Facility.
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
                                                message={
                                                    errors.DI_DM_DD.message
                                                }
                                            />
                                        )}
                                    </Box>
                                </Box>
                            )}

                            {watchRequestedInformation.includes('RI') && (
                                <Box className="p-8 mb-6 bg-gray-lightest">
                                    <Heading as="h3" variant="h5">
                                        Radiology Images Delivery Options
                                    </Heading>
                                    <Text className="mb-4">
                                        Radiology Images are automatically saved
                                        to CD. They can be delivered by mail via
                                        the US Postal Service to the address
                                        entered above, or Picked up at the
                                        Medical Facility. The department will
                                        contact you if additional information is
                                        required.
                                    </Text>

                                    <Box className="mb-4">
                                        <Label htmlFor="DI_DMRP_OPT">
                                            Desired Delivery Option:
                                        </Label>
                                        <Select
                                            name="DI_DMRP_OPT"
                                            id="DI_DMRP_OPT"
                                            className="block mt-1"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select a delivery option.',
                                            })}
                                        >
                                            <option value="PS">
                                                Send via US Postal Service
                                            </option>
                                            <option value="PU">
                                                Pickup at Facility
                                            </option>
                                        </Select>
                                        {errors.DI_DMRP_OPT && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={
                                                    errors.DI_DMRP_OPT.message
                                                }
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
                                {watchRequestedInformation.some(i =>
                                    [
                                        'ERV',
                                        'EHR',
                                        'COV',
                                        'BR',
                                        'OR',
                                        'RH',
                                    ].includes(i)
                                ) && (
                                    <>
                                        {watchRecordDeliveryMethod.includes(
                                            'DL'
                                        ) && (
                                            <Box as="li">
                                                Medical records will be
                                                delivered via this website in
                                                Adobe PDF format. A notification
                                                will be sent when the records
                                                are ready for download, and they
                                                will be available for 30 days.
                                            </Box>
                                        )}

                                        {watchRecordDeliveryMethod.includes(
                                            'PS'
                                        ) && (
                                            <Box as="li">
                                                Medical records will be mailed
                                                to the address you entered above
                                                via the US Postal Service.
                                            </Box>
                                        )}
                                        {watchRecordDeliveryMethod.includes(
                                            'PU'
                                        ) && (
                                            <Box as="li">
                                                Once ready, medical records
                                                and/or billing items can be
                                                picked up from the facility
                                                listed below.
                                            </Box>
                                        )}
                                    </>
                                )}

                                {watchRequestedInformation.includes('RI') && (
                                    <>
                                        {watchRPDeliveryMethod.includes(
                                            'PS'
                                        ) && (
                                            <Box as="li">
                                                Radiology images will be mailed
                                                to the address you entered above
                                                via the US Postal Service.
                                            </Box>
                                        )}
                                        {watchRPDeliveryMethod.includes(
                                            'PU'
                                        ) && (
                                            <Box as="li">
                                                Once ready, radiology images can
                                                be picked up from the facility
                                                listed below.
                                            </Box>
                                        )}
                                    </>
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

                            {(watchRPDeliveryMethod === 'PU' ||
                                watchRecordDeliveryMethod === 'PU') && (
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
