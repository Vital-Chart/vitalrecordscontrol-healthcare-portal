import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import cx from 'classnames'
const MicroModal = dynamic(() => import('react-micro-modal'), { ssr: false })
import { useForm } from 'react-hook-form/dist/index.ie11'
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

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        errors,
    } = useForm({
        defaultValues: store.state.form,
    })

    const [serverErrors, setServerErrors] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const watchFacilityCheckboxes = watch('FI_CB', [])
    const watchRequestedInformation = watch('RI_CB', [])
    const watchVisitOptions = watch('VI_OPT', [])
    const watchRecordDeliveryMethod = watch('DI_DM_DD', [])
    const watchRPDeliveryMethod = watch('DI_DMRP_OPT', [])
    const watchRelationshipToPatient = watch('YI_REL_DD', '')

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
                            value="PIH"
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
                                    : ''
                            }
                            ref={register}
                        />

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>
                                Facility / Facilities
                            </SectionHeading>

                            <Box as="fieldset">
                                <Box as="legend" className="mb-2">
                                    Please select the facility or facilities
                                    from which you are requesting records:
                                </Box>
                                <CheckboxWrapper>
                                    <Checkbox
                                        label="PIH Health Hospital - Downey"
                                        value="P7202-1"
                                        name="FI_CB"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select at least one facility.',
                                        })}
                                    />
                                    <Checkbox
                                        label="PIH Health Hospital - Whittier"
                                        value="P7201-1"
                                        name="FI_CB"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select at least one facility.',
                                        })}
                                    />
                                    <Checkbox
                                        label="PIH Health Hospital - PIH Health Physicians"
                                        value="P7203-1"
                                        name="FI_CB"
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                'Please select at least one facility.',
                                        })}
                                    />
                                    {errors.FI_CB && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.FI_CB.message}
                                        />
                                    )}
                                </CheckboxWrapper>
                            </Box>

                            {watchFacilityCheckboxes.length > 1 && (
                                <Info
                                    primaryText="You have selected more than one facility."
                                    secondaryText="You will receive SEPARATE tracking numbers for each facility. Each facility processes requests individually."
                                    className="my-4"
                                />
                            )}
                        </FormSection>

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
                                    <Label
                                        htmlFor="PI_PON"
                                        className="italic"
                                        className="italic"
                                    >
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
                                    <Label
                                        htmlFor="PI_PHYCL"
                                        className="italic"
                                    >
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
                                        <Flex className="flex-col items-start ml-4">
                                            <Radio
                                                label="Most recent"
                                                name="VI_OPT"
                                                value="MR"
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please select which records you would like released.',
                                                })}
                                            />
                                            <Radio
                                                label="All"
                                                name="VI_OPT"
                                                value="ALL"
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please select which records you would like released.',
                                                })}
                                            />
                                            <Radio
                                                label="In a date range"
                                                name="VI_OPT"
                                                value="DR"
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please select which records you would like released.',
                                                })}
                                            />
                                            {errors.VI_OPT && (
                                                <ErrorMessage
                                                    className="mt-2"
                                                    message={
                                                        errors.VI_OPT.message
                                                    }
                                                />
                                            )}

                                            {watchVisitOptions &&
                                                watchVisitOptions.includes(
                                                    'DR'
                                                ) && (
                                                    <>
                                                        <Flex className="space-x-4">
                                                            <Box>
                                                                <Label
                                                                    htmlFor="VI_DR_SD"
                                                                    className="block mb-1"
                                                                >
                                                                    Service
                                                                    Start:
                                                                </Label>
                                                                <Input
                                                                    type="text"
                                                                    name="VI_DR_SD"
                                                                    id="VI_DR_SD"
                                                                    className="w-full"
                                                                    placeholder="MM/DD/YYYY"
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    ref={register(
                                                                        {
                                                                            required: true,
                                                                            pattern: {
                                                                                value:
                                                                                    regexPatterns.date,
                                                                                message:
                                                                                    'Please enter a valid date (MM/DD/YYYY).',
                                                                            },
                                                                        }
                                                                    )}
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
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    ref={register(
                                                                        {
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
                                                                                    ) >=
                                                                                        new Date(
                                                                                            getValues(
                                                                                                'VI_DR_SD'
                                                                                            )
                                                                                        ) ||
                                                                                    'The Service End date you entered is before the Service Start date.',
                                                                            },
                                                                        }
                                                                    )}
                                                                />
                                                            </Box>
                                                        </Flex>

                                                        {errors.VI_DR_ED && (
                                                            <ErrorMessage
                                                                className="mt-2"
                                                                message={
                                                                    errors
                                                                        .VI_DR_ED
                                                                        .message
                                                                }
                                                            />
                                                        )}
                                                    </>
                                                )}
                                        </Flex>
                                    </Box>
                                </Box>
                            </Box>
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <Box>
                                <Box as="fieldset">
                                    <Box as="legend" className="mb-2">
                                        Please select the type of information
                                        you would like released:
                                    </Box>
                                    <CheckboxWrapper>
                                        <Checkbox
                                            label="Medical Records"
                                            name="RI_CB"
                                            value="MR"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        />

                                        {errors.RI_MR_OPT && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={
                                                    errors.RI_MR_OPT.message
                                                }
                                            />
                                        )}

                                        {watchRequestedInformation.includes(
                                            'MR'
                                        ) && (
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
                                                            label="Emergency/Urgent Care Physician Report"
                                                            name="RI_MR_FR_CB"
                                                            value="EUR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            label="Consultation Report"
                                                            name="RI_MR_FR_CB"
                                                            value="CR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            label="Laboratory Reports"
                                                            name="RI_MR_FR_CB"
                                                            value="LR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            label="Newborn Record"
                                                            name="RI_MR_FR_CB"
                                                            value="NR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            label="History and Physical Report"
                                                            name="RI_MR_FR_CB"
                                                            value="HPR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            label="Operative Report"
                                                            name="RI_MR_FR_CB"
                                                            value="OR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                    </CheckboxWrapper>
                                                    <CheckboxWrapper className="w-full">
                                                        <Checkbox
                                                            label="Pathology Report"
                                                            name="RI_MR_FR_CB"
                                                            value="PR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            label="Immunization Record"
                                                            name="RI_MR_FR_CB"
                                                            value="IR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />

                                                        <Checkbox
                                                            label="Discharge Summary Report"
                                                            name="RI_MR_FR_CB"
                                                            value="DSR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            label="Anesthesia Records"
                                                            name="RI_MR_FR_CB"
                                                            value="AR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            label="Radiology Report"
                                                            name="RI_MR_FR_CB"
                                                            value="RR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            label="Therapy Records"
                                                            name="RI_MR_FR_CB"
                                                            value="TR"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                    </CheckboxWrapper>
                                                </Flex>
                                            </Flex>
                                        )}

                                        <Checkbox
                                            label="Itemized Billing"
                                            name="RI_CB"
                                            value="IB"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        />

                                        <Checkbox
                                            label="Radiology Images"
                                            name="RI_CB"
                                            value="RI"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        >
                                            The Radiology Department will follow
                                            up if any charges or additional
                                            information is required.
                                        </Checkbox>
                                        <Checkbox
                                            label="Pathology Slides"
                                            name="RI_CB"
                                            value="PS"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select the items you would like released.',
                                            })}
                                        >
                                            The Pathology Department will follow
                                            up if any charges or additional
                                            information is required.
                                        </Checkbox>
                                    </CheckboxWrapper>

                                    {errors.RI_CB && (
                                        <ErrorMessage
                                            className="mt-2"
                                            message={errors.RI_CB.message}
                                        />
                                    )}

                                    {watchRequestedInformation.includes(
                                        'MR'
                                    ) && (
                                        <Box className="mt-4">
                                            <Text className="text-sm font-bold mb-2">
                                                The following information will
                                                not be released unless
                                                specifically authorized by
                                                checking the relevant box(es)
                                                below:
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
                                    )}
                                </Box>
                            </Box>
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>Purpose of Request</SectionHeading>
                            <Box>
                                <Box>
                                    <Text className="mb-2">
                                        Please enter your reason for requesting
                                        records.
                                    </Text>

                                    <Label htmlFor="PR_PUR">Purpose:</Label>
                                    <Textarea
                                        name="PR_PUR"
                                        id="PR_PUR"
                                        className="block w-full mt-1 mb-2 sm:text-sm rounded"
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
                                    <Label htmlFor="PR_LIM" className="italic">
                                        Limitations (Optional):
                                    </Label>
                                    <Textarea
                                        name="PR_LIM"
                                        id="PR_LIM"
                                        className="block w-full mt-1 sm:text-sm rounded"
                                        onChange={handleChange}
                                        ref={register}
                                    />
                                </Box>
                            </Box>
                        </FormSection>

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>Your Information</SectionHeading>
                            <Box>
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
                                            <option value="CON">
                                                Conservator
                                            </option>
                                        </Select>
                                    </Box>
                                    <Box className="flex-grow mb-4">
                                        <Label htmlFor="YI_REL_NM">Name</Label>
                                        <Input
                                            type="tel"
                                            name="YI_REL_NM"
                                            id="YI_REL_NM"
                                            autoComplete="name"
                                            className="w-full mt-1"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please enter your name.',
                                            })}
                                        />
                                        {errors.YI_REL_NM && (
                                            <ErrorMessage
                                                className="mt-2"
                                                message={
                                                    errors.YI_REL_NM.message
                                                }
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
                                            Text Message (Standard rates may
                                            apply.)
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

                        <FormSection className="border-b border-gray-light">
                            <SectionHeading>
                                Delivery Information
                            </SectionHeading>

                            {watchRequestedInformation.length === 0 && (
                                <Text>
                                    Delivery options will appear here once
                                    you've selected they records you'd like to
                                    receive.
                                </Text>
                            )}

                            {watchRequestedInformation.some(i =>
                                ['MR', 'IB'].includes(i)
                            ) && (
                                <Box className="p-8 mb-6 bg-gray-lightest">
                                    <Heading as="h3" variant="h5">
                                        Medical Records and Itemized Billing
                                        Delivery Options
                                    </Heading>
                                    <Text className="mb-4">
                                        There are three delivery options for
                                        Medical Records and Itemized Billing.
                                        You can download them directly from the
                                        website, or have them created on CD to
                                        be delivered by mail via the US Postal
                                        Service to the address entered below, or
                                        Picked up at the Medical Facility.
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

                            {watchRequestedInformation.some(i =>
                                ['RI', 'PS'].includes(i)
                            ) && (
                                <Box className="p-8 mb-6 bg-gray-lightest">
                                    <Heading as="h3" variant="h5">
                                        Radiology Images and Pathology Slides
                                        Delivery Options
                                    </Heading>
                                    <Text className="mb-4">
                                        Radiology Images & Pathology Slides are
                                        automatically saved to CD. They can be
                                        delivered by mail via the US Postal
                                        Service to the address entered below, or
                                        Picked up at the Medical Facility. The
                                        department will contact you if
                                        additional information is required.
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

                            {(watchRPDeliveryMethod === 'PS' ||
                                watchRecordDeliveryMethod === 'PS') && (
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

                                    <Flex className="mb-4">
                                        <Box>
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
                                                    message={
                                                        errors.DI_ZIP.message
                                                    }
                                                />
                                            )}
                                        </Box>
                                    </Flex>
                                    <Box className="mb-4">
                                        <Label htmlFor="DI_FAX">
                                            Fax Number
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
                                </Box>
                            )}
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
                                        <>
                                            {watchRPDeliveryMethod.includes(
                                                'PS'
                                            ) && (
                                                <Box as="li">
                                                    Radiology images and/or
                                                    pathology slides will be
                                                    mailed to the address you
                                                    entered above via the US
                                                    Postal Service.
                                                </Box>
                                            )}
                                            {watchRPDeliveryMethod.includes(
                                                'PU'
                                            ) && (
                                                <Box as="li">
                                                    Once ready, radiology images
                                                    and/or pathology slides can
                                                    be picked up from the
                                                    facility listed below.
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
                                <Box>
                                    {(watchRPDeliveryMethod === 'PU' ||
                                        watchRecordDeliveryMethod === 'PU') && (
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
