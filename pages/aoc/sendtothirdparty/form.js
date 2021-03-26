import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import cx from 'classnames'
const MicroModal = dynamic(() => import('react-micro-modal'), { ssr: false })
import { useForm } from 'react-hook-form'
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
    Radio,
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
    Alert,
    Info,
    ErrorMessage,
    ButtonWrapper,
    Stepper,
    ServerErrorList,
} from '@/components/atoms'

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

    const { register, handleSubmit, watch, getValues, reset, errors } = useForm(
        {
            defaultValues: store.state.form,
        }
    )

    const [serverErrors, setServerErrors] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const watchRequestedInformation = watch('RI_CB', [])
    const watchRecordDeliveryMethod = watch('DI_DM_DD', [])
    const watchRequestedInformationOptions = watch('RI_MR_OPT', '')

    useEffect(() => {
        if (Object.keys(store.state.form).length === 0) {
            reset({})
        }
    }, [store.state.form])

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
            <Stepper className="mb-4" />
            <Container>
                <Box>
                    <PageHeading className="pt-4">
                        <Text
                            as="span"
                            className="block pb-1 text-base md:text-lg font-normal text-gray-dark"
                        >
                            Release to Third-Party
                        </Text>{' '}
                        New Medical Records Request
                    </PageHeading>

                    <Box
                        as="form"
                        acceptCharset="UTF-8"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            type="hidden"
                            name="CLNT"
                            value="AOC"
                            ref={register}
                        />
                        <Input
                            type="hidden"
                            name="FTYPE"
                            value="3RD"
                            ref={register}
                        />
                        <Input
                            type="hidden"
                            name="TRKNUM"
                            value={
                                Array.isArray(store.state.trackingNumbers)
                                    ? store.state.trackingNumbers[0]
                                          .TrackingNumberID
                                    : ''
                            }
                            ref={register}
                        />

                        <Input
                            type="hidden"
                            name="FI_CB"
                            value="P4000-1"
                            ref={register}
                        />

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>Patient Information</SectionHeading>
                            <Box>
                                <Flex className="flex-col sm:flex-row mb-4">
                                    <Box className="w-full sm:mr-4">
                                        <Label htmlFor="PI_PFN">
                                            Patient First Name
                                        </Label>
                                        <Input
                                            type="text"
                                            name="PI_PFN"
                                            id="PI_PFN"
                                            className="w-full mt-1"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    "Please enter the patient's first name.",
                                            })}
                                        />
                                        {errors.PI_PFN && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={errors.PI_PFN.message}
                                            />
                                        )}
                                    </Box>

                                    <Box className="w-full mt-4 sm:mt-0">
                                        <Label htmlFor="PI_PLN">
                                            Patient Last Name
                                        </Label>
                                        <Input
                                            type="text"
                                            name="PI_PLN"
                                            id="PI_PLN"
                                            className="w-full mt-1"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    "Please enter the patient's last name.",
                                            })}
                                        />
                                        {errors.PI_PLN && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={errors.PI_PLN.message}
                                            />
                                        )}
                                    </Box>
                                </Flex>

                                <Box className="mb-4">
                                    <Label htmlFor="PI_DOB">
                                        Patient Date of Birth
                                    </Label>
                                    <Input
                                        type="text"
                                        name="PI_DOB"
                                        id="PI_DOB"
                                        className="w-full mt-1"
                                        placeholder="MM/DD/YYYY"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                "Please enter the patient's date of birth.",
                                            pattern: {
                                                value: regexPatterns.date,
                                                message:
                                                    'Please enter a valid date (MM/DD/YYYY).',
                                            },
                                        })}
                                    />

                                    {errors.PI_DOB && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.PI_DOB.message}
                                        />
                                    )}
                                </Box>
                            </Box>
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>
                                Requested Information
                            </SectionHeading>
                            <Box>
                                <Box as="fieldset">
                                    <Flex>
                                        <Box className="mb-4 mr-4">
                                            <Box as="legend">
                                                Requested Records:
                                            </Box>
                                            <Select
                                                name="RI_MR_OPT"
                                                id="RI_MR_OPT"
                                                className="block mt-1"
                                                onChange={handleChange}
                                                ref={register}
                                            >
                                                <option defaultValue value="">
                                                    Select records
                                                </option>
                                                <option value="ALLNXM">
                                                    All (No Recent X-Rays/MRIs)
                                                </option>
                                                <option value="ALLXM">
                                                    All (Plus Recent
                                                    X-Rays/MRIs)
                                                </option>
                                                <option value="XM">
                                                    Only Recent X-Rays/MRIs
                                                </option>
                                            </Select>
                                        </Box>

                                        {(watchRequestedInformationOptions ===
                                            'ALLXM' ||
                                            watchRequestedInformationOptions ===
                                                'XM') && (
                                            <Box className="mb-4 mr-4">
                                                <Label htmlFor="RI_MR_OPT_CNT">
                                                    Imaging Copies
                                                </Label>
                                                <Input
                                                    type="number"
                                                    name="RI_MR_OPT_CNT"
                                                    id="RI_MR_OPT_CNT"
                                                    className="block mt-1"
                                                    onChange={handleChange}
                                                    ref={register({
                                                        required:
                                                            'Please enter the number of copies.',
                                                    })}
                                                />
                                                {errors.RI_MR_OPT_CNT && (
                                                    <ErrorMessage
                                                        className="mt-2"
                                                        message={
                                                            errors.RI_MR_OPT_CNT
                                                                .message
                                                        }
                                                    />
                                                )}
                                            </Box>
                                        )}
                                    </Flex>

                                    <CheckboxWrapper>
                                        {watchRequestedInformationOptions.length >
                                            0 && (
                                            <Checkbox
                                                labelClassName="hidden"
                                                label="Medical Records"
                                                name="RI_CB"
                                                value="MR"
                                                checked
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please select the items you would like released.',
                                                })}
                                            />
                                        )}

                                        <Checkbox
                                            labelClassName="mb-2"
                                            label="Include physical therapy records?"
                                            name="RI_CB"
                                            value="PT"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        />

                                        <Checkbox
                                            label="Include visits from today or yesterday?"
                                            name="RI_CB"
                                            value="VSTY"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        >
                                            May delay processing by 2 days.
                                        </Checkbox>
                                    </CheckboxWrapper>
                                    {errors.RI_CB && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.RI_CB.message}
                                        />
                                    )}
                                </Box>
                                <Box className="mt-4">
                                    <Text className="max-w-lg mb-2 text-sm font-bold">
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
                                    </CheckboxWrapper>
                                </Box>
                            </Box>
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
                                        ref={register({
                                            required: true,
                                        })}
                                    >
                                        <option value="PG">
                                            Parent/Guardian
                                        </option>
                                        <option value="CON">Conservator</option>
                                        <option value="PR">
                                            Personal Representative
                                        </option>
                                        <option value="OT">Other</option>
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
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>
                                Delivery Information
                            </SectionHeading>

                            <Input
                                type="hidden"
                                name="DI_DM_DD"
                                value="DL"
                                ref={register}
                            />

                            {(watchRequestedInformationOptions === 'ALLXM' ||
                                watchRequestedInformationOptions === 'XM') && (
                                <Input
                                    type="hidden"
                                    name="DI_DMRP_DD"
                                    value="PS"
                                    ref={register}
                                />
                            )}

                            <Info
                                secondaryText="All records will be
                                    delivered via this website
                                    in Adobe PDF format. A
                                    notification will be sent
                                    when the records are ready
                                    for download, and they will
                                    be available for 30 days."
                                className="my-4"
                            />

                            <Box>
                                <Flex className="flex-col sm:flex-row">
                                    <Box className="mr-4 mb-4">
                                        <Label htmlFor="DI_REC_DD">
                                            Recipient
                                        </Label>
                                        <Select
                                            name="DI_REC_DD"
                                            id="DI_REC_DD"
                                            className="block mt-1 mb-2 sm:mr-4"
                                            onChange={handleChange}
                                            ref={register({
                                                validate: {
                                                    stateCheck: value =>
                                                        value !==
                                                            'Select a recipient' ||
                                                        'Please select a recipient.',
                                                },
                                            })}
                                        >
                                            <option>Select a recipient</option>
                                            <option value="HP">
                                                Healthcare Provider
                                            </option>
                                            <option value="ATY">
                                                Attorney
                                            </option>
                                            <option value="INS">
                                                Insurance Company
                                            </option>
                                            <option value="OTHER">Other</option>
                                        </Select>
                                        {errors.DI_REC_DD && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={
                                                    errors.DI_REC_DD.message
                                                }
                                            />
                                        )}
                                    </Box>
                                    <Box className="flex-grow mb-4">
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
                                </Flex>
                                <Box className="mb-4">
                                    <Label htmlFor="DI_ADDR1">Address</Label>
                                    <Input
                                        type="text"
                                        name="DI_ADDR1"
                                        id="DI_ADDR1"
                                        className="w-full mt-1"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please enter an address.',
                                        })}
                                    />
                                    {errors.DI_ADDR1 && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.DI_ADDR1.message}
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
                                        className="w-full mt-1"
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
                                        className="w-full mt-1"
                                        onChange={handleChange}
                                        ref={register({
                                            required: 'Please enter a city.',
                                        })}
                                    />

                                    {errors.DI_CITY && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.DI_CITY.message}
                                        />
                                    )}
                                </Box>

                                <Flex className="mb-4">
                                    <Box>
                                        <Label htmlFor="DI_ST_DD">State</Label>
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
                                            {Object.keys(states).map(key => (
                                                <option value={key} key={key}>
                                                    {states[key]}
                                                </option>
                                            ))}
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
                                    <Box>
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
                                                message={errors.DI_ZIP.message}
                                            />
                                        )}
                                    </Box>
                                </Flex>

                                <Flex className="flex-col sm:flex-row">
                                    <Box className="mb-4 sm:mr-4">
                                        <Label htmlFor="DI_FAX">
                                            Fax Number
                                        </Label>
                                        <Input
                                            type="tel"
                                            name="DI_FAX"
                                            id="DI_FAX"
                                            className="w-full mt-1"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please enter a fax number.',
                                                pattern: {
                                                    value: regexPatterns.phone,
                                                    message:
                                                        'Please enter a valid phone number.',
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
                                    <Box className="mb-4 sm:mr-4">
                                        <Label htmlFor="DI_Phone">
                                            Phone Number
                                        </Label>
                                        <Input
                                            type="tel"
                                            name="DI_Phone"
                                            id="DI_Phone"
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
                                        {errors.DI_Phone && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={
                                                    errors.DI_Phone.message
                                                }
                                            />
                                        )}
                                    </Box>
                                    <Box className="mb-4 ">
                                        <Label htmlFor="DI_Phone_ext">
                                            Phone Extension
                                        </Label>
                                        <Input
                                            type="tel"
                                            name="DI_Phone_ext"
                                            id="DI_Phone_ext"
                                            autoComplete="tel"
                                            className="w-full mt-1"
                                            onChange={handleChange}
                                            ref={register}
                                        />
                                    </Box>
                                </Flex>
                            </Box>
                        </FormSection>

                        <FormSection>
                            <SectionHeading>Delivery Summary</SectionHeading>
                            <Box>
                                <Box
                                    as="ul"
                                    className="pl-8 mb-8 space-y-2 list-disc"
                                >
                                    {watchRequestedInformation.some(i =>
                                        ['MR', 'IB'].includes(i)
                                    ) && (
                                        <>
                                            {watchRecordDeliveryMethod.includes(
                                                'DL'
                                            ) && (
                                                <Box as="li">
                                                    Medical records and/or
                                                    billing items will be
                                                    delivered via this website
                                                    in Adobe PDF format. A
                                                    notification will be sent
                                                    when the records are ready
                                                    for download, and they will
                                                    be available for 30 days.
                                                </Box>
                                            )}

                                            {watchRecordDeliveryMethod.includes(
                                                'PS'
                                            ) && (
                                                <Box as="li">
                                                    Medical records and/or
                                                    billing items will be mailed
                                                    to the address you entered
                                                    above via the US Postal
                                                    Service.
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

                                    {watchRequestedInformation.some(i =>
                                        ['RI', 'PS'].includes(i)
                                    ) && (
                                        <Box as="li">
                                            Radiology images and/or pathology
                                            slides will be mailed to the address
                                            you entered above via the US Postal
                                            Service.
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
                                <Box>
                                    {watchRecordDeliveryMethod === 'PU' && (
                                        <Box className="p-8 mb-4 space-y-4 bg-gray-lightest">
                                            <Text>
                                                Once available, records can be
                                                picked up from the facility or
                                                facilities listed below.
                                            </Text>
                                            {watchFacilityCheckboxes.includes(
                                                'P7202-1'
                                            ) && (
                                                <Box>
                                                    <Text
                                                        as="span"
                                                        className="font-bold"
                                                    >
                                                        PIH Health Hospital -
                                                        Downey
                                                    </Text>
                                                    <Text>
                                                        11500 Brookshire Avenue
                                                    </Text>
                                                    <Text>
                                                        Downey, CA 90241
                                                    </Text>
                                                    <Text>
                                                        (562) 904-5166 x26177
                                                    </Text>
                                                </Box>
                                            )}

                                            {watchFacilityCheckboxes.includes(
                                                'P7201-1'
                                            ) && (
                                                <Box>
                                                    <Text
                                                        as="span"
                                                        className="font-bold"
                                                    >
                                                        PIH Health Hospital -
                                                        Whittier
                                                    </Text>
                                                    <Text>
                                                        12401 Washington Blvd
                                                    </Text>
                                                    <Text>
                                                        Whittier, CA 90602
                                                    </Text>
                                                    <Text>
                                                        (562) 698-0811 x13685
                                                    </Text>
                                                </Box>
                                            )}

                                            {watchFacilityCheckboxes.includes(
                                                'P7203-1'
                                            ) && (
                                                <Box>
                                                    <Text
                                                        as="span"
                                                        className="font-bold"
                                                    >
                                                        PIH Health Physicians
                                                    </Text>
                                                    <Text>
                                                        12401 Washington Blvd
                                                    </Text>
                                                    <Text>
                                                        Whittier, CA 90602
                                                    </Text>
                                                    <Text>
                                                        (562) 698-0811 x13858
                                                    </Text>
                                                </Box>
                                            )}
                                        </Box>
                                    )}
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
                </Box>
            </Container>
        </Layout>
    )
}

export default withStore(Form)
