import { useState } from 'react'
import dynamic from 'next/dynamic'
import cx from 'classnames'
const MicroModal = dynamic(() => import('react-micro-modal'), { ssr: false })
import { useForm } from 'react-hook-form'
import { withStore } from '@/lib/store'
import { createRequest } from '@/lib/api'
import { regexPatterns, states } from '@/lib/helpers'
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
    Flex,
    Button,
    Link,
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
    const { getLandingPage, goToStep, getContactPage } = useNavigation()

    const { register, handleSubmit, watch, getValues, errors } = useForm({
        defaultValues: store.state.form,
    })

    const [serverErrors, setServerErrors] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const watchFacilityCheckboxes = watch('FI_CB', [])
    const watchRequestedInformation = watch('RI_CB', [])
    const watchVisitOptions = watch('VI_OPT', [])
    const watchDeliveryMethod = watch('DI_DM_DD', [])

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
                            Quick Release to You
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
                            value="UCSF"
                            ref={register}
                        />
                        <Input
                            type="hidden"
                            name="FTYPE"
                            value="PAT"
                            ref={register}
                        />
                        <Input
                            type="hidden"
                            name="TRKNUM"
                            value={
                                Array.isArray(store.state.trackingNumbers)
                                    ? store.state.trackingNumbers[0]
                                          .TrackingNumberID
                                    : '-1'
                            }
                            ref={register}
                        />
                        <Input
                            type="hidden"
                            name="FI_CB"
                            value="P7100-1"
                            ref={register}
                        />

                        <FormSection>
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
                                    <Label htmlFor="PI_PON">
                                        Other Patient Names (Optional)
                                    </Label>
                                    <Input
                                        type="text"
                                        name="PI_PON"
                                        id="PI_PON"
                                        className="w-full mt-1"
                                        onChange={handleChange}
                                        ref={register}
                                    />
                                </Box>

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

                                <Box className="mb-4">
                                    <Label htmlFor="PI_PHYCL">
                                        Physician/Clinic (Optional)
                                    </Label>
                                    <Input
                                        type="text"
                                        name="PI_PHYCL"
                                        id="PI_PHYCL"
                                        className="w-full mt-1"
                                        onChange={handleChange}
                                        ref={register}
                                    />
                                </Box>
                                <Box>
                                    <Box as="fieldset">
                                        <Box as="legend" className="mb-2">
                                            Please select the visits/admissions
                                            you would like released:
                                        </Box>
                                        <Input
                                            type="hidden"
                                            name="VI_OPT"
                                            value="DR"
                                            ref={register}
                                        />

                                        <Flex className="space-x-4">
                                            <Box>
                                                <Label
                                                    htmlFor="VI_DR_SD"
                                                    className="block mb-1"
                                                >
                                                    Service Start:
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="VI_DR_SD"
                                                    id="VI_DR_SD"
                                                    className="w-full"
                                                    placeholder="MM/DD/YYYY"
                                                    onChange={handleChange}
                                                    ref={register({
                                                        required: true,
                                                        pattern: {
                                                            value:
                                                                regexPatterns.date,
                                                            message:
                                                                'Please enter a valid date (MM/DD/YYYY).',
                                                        },
                                                    })}
                                                />
                                            </Box>

                                            <Box>
                                                <Label
                                                    htmlFor="VI_DR_ED"
                                                    className="block mb-1"
                                                >
                                                    Service End:
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="VI_DR_ED"
                                                    id="VI_DR_ED"
                                                    className="w-full"
                                                    placeholder="MM/DD/YYYY"
                                                    onChange={handleChange}
                                                    ref={register({
                                                        required: true,
                                                        pattern: {
                                                            value:
                                                                regexPatterns.date,
                                                            message:
                                                                'Please enter a valid date (MM/DD/YYYY).',
                                                        },
                                                        validate: {
                                                            dateRangeCheck: value =>
                                                                new Date(
                                                                    value
                                                                ) >
                                                                    new Date(
                                                                        getValues(
                                                                            'VI_DR_SD'
                                                                        )
                                                                    ) ||
                                                                'The Service End date you entered is before the Service Start date.',
                                                        },
                                                    })}
                                                />
                                            </Box>
                                        </Flex>

                                        {errors.VI_DR_ED && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={
                                                    errors.VI_DR_ED.message
                                                }
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </FormSection>

                        <FormSection>
                            <Box>
                                <Box as="fieldset">
                                    <Box as="legend" className="mb-2">
                                        Please select the type of information
                                        you would like released:
                                    </Box>
                                    <CheckboxWrapper>
                                        <Checkbox
                                            label="Emergency Room Visit"
                                            labelClassName="w-full"
                                            name="RI_CB"
                                            value="ERV"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        >
                                            (i.e. ED provider notes, radiology
                                            reports, lab and diagnostic,
                                            consults and procedure notes)
                                        </Checkbox>
                                        <Checkbox
                                            label="Entire Hospital Record"
                                            labelClassName="w-full"
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
                                            lab, radiology reports, nursing
                                            notes, progress notes)
                                        </Checkbox>
                                        <Checkbox
                                            label="Clinic or Office Visit"
                                            labelClassName="w-full"
                                            name="RI_CB"
                                            value="COV"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        >
                                            (i.e. Progress notes, office notes,
                                            procedure notes, operative notes,
                                            lab, diagnostic and radiology
                                            reports)
                                        </Checkbox>
                                        <Checkbox
                                            label="Billing Records"
                                            labelClassName="w-full"
                                            name="RI_CB"
                                            value="BR"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        />
                                        <Checkbox
                                            label="Radiology Images (only)"
                                            labelClassName="w-full"
                                            name="RI_CB"
                                            value="RI"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        />
                                        <Checkbox
                                            label="Other Records"
                                            labelClassName="w-full"
                                            name="RI_CB"
                                            value="OR"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        />
                                    </CheckboxWrapper>

                                    <Box className="mt-4">
                                        <Label htmlFor="RI_CB_OR">
                                            Specify Other Records:
                                        </Label>
                                        <Box
                                            as="textarea"
                                            name="RI_CB_OR"
                                            id="RI_CB_OR"
                                            className="block w-full mt-1 mb-2 sm:text-sm border-gray-dark rounded"
                                            placeholder="Examples: Patient Request, Continuity of Care, Billing/Payment, etc."
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please enter the purpose of this request.',
                                            })}
                                        />
                                    </Box>

                                    {errors.RI_CB && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.RI_CB.message}
                                        />
                                    )}
                                    <Info
                                        secondaryText="Medical Records and Itemized Billing will be delivered electronically through this website."
                                        className="mt-4"
                                    />
                                    <Box className="mt-4">
                                        <Text className="text-sm font-bold mb-2">
                                            The following information will not
                                            be released unless specifically
                                            authorized by checking the relevant
                                            box(es) below:
                                        </Text>
                                        <CheckboxWrapper>
                                            <Checkbox
                                                name="RI_MR_AI_CB"
                                                label="Information pertaining to mental health diagnosis or treatment"
                                                value="IPM"
                                                onChange={handleChange}
                                                ref={register}
                                            />
                                            <Checkbox
                                                name="RI_MR_AI_CB"
                                                label="Information pertaining to drug and alcohol abuse, diagnosis, or treatment"
                                                value="IPD"
                                                onChange={handleChange}
                                                ref={register}
                                            />
                                            <Checkbox
                                                name="RI_MR_AI_CB"
                                                label="HIV/AIDS test results"
                                                value="HIV"
                                                onChange={handleChange}
                                                ref={register}
                                            />
                                            <Checkbox
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
                            </Box>
                        </FormSection>

                        <FormSection>
                            <SectionHeading>Purpose of Request</SectionHeading>
                            <Box>
                                <Box>
                                    <Text className="mb-2">
                                        Please enter your reason for requesting
                                        records.
                                    </Text>

                                    <Label htmlFor="PR_PUR">Purpose:</Label>
                                    <Box
                                        as="textarea"
                                        name="PR_PUR"
                                        id="PR_PUR"
                                        className="block w-full mt-1 mb-2 sm:text-sm border-gray-dark rounded"
                                        placeholder="Examples: Patient Request, Continuity of Care, Billing/Payment, etc."
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please enter the purpose of this request.',
                                        })}
                                    />
                                    {errors.PR_PUR && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.PR_PUR.message}
                                        />
                                    )}
                                </Box>
                                <Box>
                                    <Label htmlFor="PR_LIM">
                                        Limitations (Optional):
                                    </Label>
                                    <Box
                                        as="textarea"
                                        name="PR_LIM"
                                        id="PR_LIM"
                                        className="block w-full mt-1 sm:text-sm border-gray-dark rounded"
                                        onChange={handleChange}
                                        ref={register}
                                    />
                                </Box>
                            </Box>
                        </FormSection>

                        <FormSection>
                            <SectionHeading>Your Information</SectionHeading>
                            <Box>
                                <Box className="mb-4">
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
                                                            onClick={
                                                                handleClose
                                                            }
                                                            className=""
                                                        />
                                                        <ScreenReader>
                                                            Close
                                                        </ScreenReader>
                                                    </Button>

                                                    <Box>
                                                        <Text className="text-xl font-bold">
                                                            Preferred
                                                            Notification Method
                                                        </Text>

                                                        <Text>
                                                            This is the method
                                                            by which you would
                                                            like to receive
                                                            automatic
                                                            notifications of the
                                                            progress of your
                                                            request(s), as well
                                                            as how you will
                                                            receive password
                                                            updates from this
                                                            website. If we have
                                                            specific questions
                                                            about your request,
                                                            we will call you at
                                                            the phone number
                                                            listed.
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
                                            Text Message (Standard messaging
                                            rates may apply.)
                                        </option>
                                        <option value="email">Email</option>
                                    </Select>
                                </Box>

                                <Flex className="flex-col sm:flex-row">
                                    <Box className="mb-4 sm:mr-4">
                                        <Label htmlFor="YI_PN">
                                            Phone Number
                                        </Label>
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
                                                required: true,
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
                                                    value ===
                                                        getValues('YI_PN') ||
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
                                                    value ===
                                                        getValues('YI_EM') ||
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
                            </Box>
                        </FormSection>

                        <FormSection>
                            <SectionHeading>
                                Delivery Information
                            </SectionHeading>
                            <Box>
                                <Box
                                    as="ul"
                                    className="pl-8 space-y-2 list-disc"
                                >
                                    <Box as="li">
                                        Medical records will be delivered via
                                        this website in Adobe PDF format. A
                                        notification will be sent when the
                                        records are ready for download, and they
                                        will be available for 30 days.
                                    </Box>

                                    <Box as="li">
                                        Normal processing time is 5 business
                                        days from time of receipt.
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

                                {watchRequestedInformation.some(i =>
                                    ['RI', 'PS'].includes(i)
                                ) && (
                                    <>
                                        <Info
                                            secondaryText="Radiology Images are saved to CD.
                                                        Radiology Images and Pathology
                                                        Slides can be either picked up by
                                                        you at the facility, or delivered to
                                                        you via US Mail. Please select an
                                                        option below."
                                            className="my-4"
                                        />

                                        <Box className="mb-4">
                                            <Label htmlFor="DI_DM_DD">
                                                CD Delivery Method
                                            </Label>
                                            <Select
                                                name="DI_DM_DD"
                                                id="DI_DM_DD"
                                                className="block mt-1"
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please select a delivery method.',
                                                })}
                                            >
                                                {/* <option value="DL">Download</option> */}
                                                <option value="PS">
                                                    Postal Service - Mail
                                                </option>
                                                <option value="PU">
                                                    Pick Up
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
                                        {watchDeliveryMethod.includes('PS') && (
                                            <Box className="mb-4">
                                                <Text className="mb-4">
                                                    Radiology CDs and/or
                                                    Pathology Slides will be
                                                    mailed to the address you
                                                    enter below via the US
                                                    Postal Service. The
                                                    department will contact you
                                                    if additional information is
                                                    required.
                                                </Text>
                                                <Box className="mb-4">
                                                    <Label htmlFor="DI_NM">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="DI_NM"
                                                        id="DI_NM"
                                                        className="w-full mt-1 mb-2"
                                                        onChange={handleChange}
                                                        ref={register({
                                                            required:
                                                                'Please enter a name.',
                                                        })}
                                                    />

                                                    {errors.DI_NM && (
                                                        <ErrorMessage
                                                            className="mt-2"
                                                            message={
                                                                errors.DI_NM
                                                                    .message
                                                            }
                                                        />
                                                    )}
                                                </Box>

                                                <Box className="mb-4">
                                                    <Label htmlFor="DI_ATN">
                                                        Attention
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="DI_ATN"
                                                        id="DI_ATN"
                                                        className="w-full mt-1 mb-2"
                                                        onChange={handleChange}
                                                        ref={register}
                                                    />
                                                </Box>

                                                <Box className="mb-4">
                                                    <Label htmlFor="DI_ADDR1">
                                                        Address
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="DI_ADDR1"
                                                        id="DI_ADDR1"
                                                        className="w-full mt-1  mb-2"
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
                                                                errors.DI_ADDR1
                                                                    .message
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
                                                    <Label htmlFor="DI_CITY">
                                                        City
                                                    </Label>
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
                                                            message={
                                                                errors.DI_CITY
                                                                    .message
                                                            }
                                                        />
                                                    )}
                                                </Box>
                                                <Flex>
                                                    <Box>
                                                        <Label htmlFor="DI_ST_DD">
                                                            State
                                                        </Label>
                                                        <Select
                                                            name="DI_ST_DD"
                                                            id="DI_ST_DD"
                                                            className="block mt-1 mr-4"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register({
                                                                validate: {
                                                                    stateCheck: value =>
                                                                        value !==
                                                                            'Select a state' ||
                                                                        'Please select a state.',
                                                                },
                                                            })}
                                                        >
                                                            <option>
                                                                Select a state
                                                            </option>
                                                            {Object.keys(
                                                                states
                                                            ).map(key => (
                                                                <option
                                                                    value={key}
                                                                    key={key}
                                                                >
                                                                    {
                                                                        states[
                                                                            key
                                                                        ]
                                                                    }
                                                                </option>
                                                            ))}
                                                        </Select>

                                                        {errors.DI_ST_DD && (
                                                            <ErrorMessage
                                                                className="mt-2"
                                                                message={
                                                                    errors
                                                                        .DI_ST_DD
                                                                        .message
                                                                }
                                                            />
                                                        )}
                                                    </Box>
                                                    <Box>
                                                        <Label htmlFor="DI_ZIP">
                                                            Zip
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            name="DI_ZIP"
                                                            id="DI_ZIP"
                                                            className="w-full mt-1"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register({
                                                                required:
                                                                    'Please enter a zip code.',
                                                            })}
                                                        />

                                                        {errors.DI_ZIP && (
                                                            <ErrorMessage
                                                                className="mt-2"
                                                                message={
                                                                    errors
                                                                        .DI_ZIP
                                                                        .message
                                                                }
                                                            />
                                                        )}
                                                    </Box>
                                                </Flex>
                                            </Box>
                                        )}
                                        {watchDeliveryMethod.includes('PU') && (
                                            <Box className="mb-4 space-y-4">
                                                <Text>
                                                    Once available, Radiology
                                                    Images and/or Pathology
                                                    Slides can be picked up from
                                                    the facility or facilities
                                                    listed below.
                                                </Text>
                                                {watchFacilityCheckboxes.includes(
                                                    'P7202-1'
                                                ) && (
                                                    <Box>
                                                        <Text
                                                            as="span"
                                                            className="font-bold"
                                                        >
                                                            PIH Health Hospital
                                                            - Downey
                                                        </Text>
                                                        <Text>
                                                            11500 Brookshire
                                                            Avenue
                                                        </Text>
                                                        <Text>
                                                            Downey, CA 90241
                                                        </Text>
                                                        <Text>
                                                            (562) 904-5166
                                                            x26177
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
                                                            PIH Health Hospital
                                                            - Whittier
                                                        </Text>
                                                        <Text>
                                                            12401 Washington
                                                            Blvd
                                                        </Text>
                                                        <Text>
                                                            Whittier, CA 90602
                                                        </Text>
                                                        <Text>
                                                            (562) 698-0811
                                                            x13685
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
                                                            PIH Health
                                                            Physicians
                                                        </Text>
                                                        <Text>
                                                            12401 Washington
                                                            Blvd
                                                        </Text>
                                                        <Text>
                                                            Whittier, CA 90602
                                                        </Text>
                                                        <Text>
                                                            (562) 698-0811
                                                            x13858
                                                        </Text>
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </>
                                )}
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
                                className="flex-grow m-2 text-center"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="filled"
                                disabled={isFetching}
                                className={cx(
                                    'flex-grow m-2 text-center',
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
