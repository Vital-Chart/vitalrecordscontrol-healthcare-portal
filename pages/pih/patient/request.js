import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { withStore } from '@/lib/store'
import { Layout, Container } from '@/components/general'
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
    Heading,
} from '@/components/core'
import {
    FormWrapper,
    FormSection,
    SectionHeading,
    PageHeading,
    CheckboxWrapper,
    Alert,
    Info,
    ErrorMessage,
    FileInput,
    ButtonWrapper,
    UploadsList,
} from '@/components/atoms'
import IconSlash from '@/icons/icon-slash.svg'
import { range, months } from '@/lib/helpers'

const PIHPatientRequest = ({ store }) => {
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        errors,
    } = useForm()
    const watchFacilityCheckboxes = watch('FI_CB', [])
    const watchRequestedInformation = watch('RI_CB', [])
    const watchVisitOptions = watch('VI_OPT', [])

    const [currentStep, setCurrentStep] = useState(1)

    const [birthDay, setBirthDay] = useState(null)
    const [birthMonth, setBirthMonth] = useState(null)
    const [birthYear, setBirthYear] = useState(null)

    const handleChange = e => {
        const formValues = getValues()
        store.dispatch({
            type: 'UPDATE_FORM',
            name: e.target.name,
            value: formValues[e.target.name],
        })
    }

    async function onSubmit(data) {
        const formattedData = formatData(data)
        console.table(formattedData)
        // await fetch('https://vrctest.free.beeceptor.com ', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formattedData),
        // }).then(res => {
        //     if (res.ok) {
        //         alert('POST Successful')
        //     } else {
        //         alert(
        //             'There was a problem with your submission. Please try again.'
        //         )
        //     }
        //     console.table(res)
        // })
        // alert(JSON.stringify(formattedData))
    }

    const formatData = data => {
        const formattedData = {}
        Object.keys(data).map(key => {
            const fieldValue = getValues(key)

            // Create comma separated strings from array values
            if (Array.isArray(fieldValue)) {
                formattedData[key] = fieldValue.join()
            } else {
                formattedData[key] = fieldValue
            }
        })
        return formattedData
    }

    const formatDate = (month, day, year) => {
        return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`
    }

    useEffect(() => {
        if (birthDay && birthMonth && birthYear) {
            const dateOfBirth = formatDate(birthMonth, birthDay, birthYear)
            setValue('PI_DOB', dateOfBirth)
        }
    }, [birthDay, birthMonth, birthYear])

    return (
        <Layout>
            <Box className="py-4 mb-4 bg-gray-lightest">
                <Container>
                    <Box as="nav" className="flex" aria-label="Breadcrumb">
                        <Box as="ol" className="flex items-center space-x-4">
                            <Box as="li">
                                <Box>
                                    <Link
                                        href="#"
                                        aria-current="page"
                                        className="text-sm text-center sm:text-left text-gray hover:text-gray-dark"
                                        onClick={e => {
                                            e.preventDefault()
                                            if (currentStep !== 1) {
                                                setCurrentStep(1)
                                            }
                                        }}
                                    >
                                        Request Information
                                    </Link>
                                </Box>
                            </Box>
                            <Box as="li">
                                <Flex className="items-center">
                                    <IconSlash className="flex-shrink-0 h-5 w-5 text-gray-light" />
                                    <Link
                                        href="#"
                                        className="ml-4 text-sm text-center sm:text-left text-gray hover:text-gray-dark"
                                        onClick={e => {
                                            e.preventDefault()
                                            if (currentStep !== 2) {
                                                setCurrentStep(2)
                                            }
                                        }}
                                    >
                                        Upload Authorization
                                    </Link>
                                </Flex>
                            </Box>
                            <Box as="li">
                                <Flex className="items-center">
                                    <IconSlash className="flex-shrink-0 h-5 w-5 text-gray-light" />
                                    <Link
                                        href="#"
                                        className="ml-4 text-sm text-center sm:text-left text-gray hover:text-gray-dark"
                                        onClick={e => {
                                            e.preventDefault()
                                            if (currentStep !== 3) {
                                                setCurrentStep(3)
                                            }
                                        }}
                                    >
                                        Review & Submit
                                    </Link>
                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Container>
                {currentStep === 1 && (
                    <Box>
                        <PageHeading>New Medical Records Request</PageHeading>
                        <FormWrapper
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
                                name="SECSIG"
                                value="TBD"
                                ref={register}
                            />
                            <Input
                                type="hidden"
                                name="TRKNUM"
                                value={-1}
                                ref={register}
                            />

                            <FormSection>
                                <SectionHeading>
                                    Facility / Facilities
                                </SectionHeading>
                                <Box>
                                    <Box as="legend" className="mb-2">
                                        Please select the facility or facilities
                                        from which you are requesting records:
                                    </Box>
                                    <CheckboxWrapper>
                                        <Checkbox
                                            label="PIH Health Hospital - Downey"
                                            value="P7202-1"
                                            name="FI_CB"
                                            labelClassName="w-full mb-2"
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
                                            labelClassName="w-full mb-2"
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
                                            labelClassName="w-full"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    'Please select at least one facility.',
                                            })}
                                        />
                                        {errors.FI_CB && (
                                            <ErrorMessage
                                                message={errors.FI_CB.message}
                                            />
                                        )}
                                    </CheckboxWrapper>
                                </Box>

                                {watchFacilityCheckboxes.length > 1 && (
                                    <Alert
                                        primaryAlertText="You have selected more than one facility."
                                        secondaryAlertText="You will receive SEPARATE tracking numbers for each facility. Each facility processes requests individually."
                                    />
                                )}

                                {watchFacilityCheckboxes.length > 0 && (
                                    <Alert
                                        primaryAlertText="Once you hit 'Continue' below, you cannot change which
                    facilities you are requesting from."
                                        secondaryAlertText="Please double-check to make sure you select the correct
                    facility or facilities."
                                    />
                                )}
                            </FormSection>

                            <FormSection>
                                <SectionHeading>
                                    Patient Information
                                </SectionHeading>
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
                                                    message={
                                                        errors.PI_PFN.message
                                                    }
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
                                                    message={
                                                        errors.PI_PLN.message
                                                    }
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
                                    <Box as="fieldset" className="mb-4">
                                        <Box as="legend">
                                            Patient Date of Birth
                                        </Box>

                                        <Input
                                            type="text"
                                            name="PI_DOB"
                                            className="hidden"
                                            onChange={handleChange}
                                            ref={register({
                                                required:
                                                    "Please enter the patient's date of birth.",
                                            })}
                                        />

                                        <Flex className="mt-1">
                                            <Select
                                                name="birthMonth"
                                                className="mr-2"
                                                autoComplete="bday-month"
                                                onChange={e =>
                                                    setBirthMonth(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    key="month"
                                                    defaultValue
                                                    disabled
                                                >
                                                    Month
                                                </option>
                                                {months.map(month => (
                                                    <option
                                                        key={`mth-${month.number}`}
                                                        value={month.number}
                                                    >
                                                        {month.name}
                                                    </option>
                                                ))}
                                            </Select>
                                            <Select
                                                name="birthDay"
                                                className="mr-2"
                                                autoComplete="bday-day"
                                                onChange={e =>
                                                    setBirthDay(e.target.value)
                                                }
                                            >
                                                <option defaultValue disabled>
                                                    Day
                                                </option>
                                                {range(1, 31).map(day => (
                                                    <option
                                                        key={`day-${day}`}
                                                        value={day}
                                                    >
                                                        {day}
                                                    </option>
                                                ))}
                                            </Select>
                                            <Input
                                                name="birthYear"
                                                type="number"
                                                min="1900"
                                                max="2021"
                                                placeholder="Year"
                                                autoComplete="bday-year"
                                                onChange={e =>
                                                    setBirthYear(e.target.value)
                                                }
                                            />
                                        </Flex>

                                        {errors.PI_DOB && (
                                            <ErrorMessage
                                                message={
                                                    errors.birthMonth.message
                                                }
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
                                                Please select the
                                                visits/admissions you would like
                                                released:
                                            </Box>
                                            <Box className="ml-4">
                                                <Radio
                                                    label="Most recent"
                                                    labelClassName="w-full"
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
                                                    labelClassName="w-full"
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
                                                    labelClassName="w-full"
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
                                                        message={
                                                            errors.VI_OPT
                                                                .message
                                                        }
                                                    />
                                                )}

                                                {watchVisitOptions &&
                                                    watchVisitOptions.includes(
                                                        'DR'
                                                    ) && (
                                                        <Flex>
                                                            <Box>
                                                                <Label className="block mb-1">
                                                                    Service
                                                                    Start:
                                                                </Label>
                                                                <Input
                                                                    type="date"
                                                                    name="PI_DOB"
                                                                    id="PI_DOB"
                                                                    className="mr-4"
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    ref={register(
                                                                        {
                                                                            required: true,
                                                                        }
                                                                    )}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <Label className="block mb-1">
                                                                    Service End:
                                                                </Label>
                                                                <Input
                                                                    type="date"
                                                                    name="PI_DOB"
                                                                    id="PI_DOB"
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    ref={register(
                                                                        {
                                                                            required: true,
                                                                        }
                                                                    )}
                                                                />
                                                            </Box>
                                                        </Flex>
                                                    )}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </FormSection>

                            <FormSection>
                                <Box>
                                    <Box as="fieldset">
                                        <Box as="legend" className="mb-2">
                                            Please select the type of
                                            information you would like released:
                                        </Box>
                                        <CheckboxWrapper>
                                            <Checkbox
                                                label="Medical Records"
                                                labelClassName="w-full"
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
                                                    message={
                                                        errors.RI_MR_OPT.message
                                                    }
                                                />
                                            )}

                                            {watchRequestedInformation.includes(
                                                'MR'
                                            ) && (
                                                <Box className="ml-4">
                                                    <Radio
                                                        label="Pertinent Information (Discharge Summary, History and Physical, Consultation, ER Reports, Labs, Radiology Reports, EKGs, Pathology Reports)"
                                                        labelClassName="w-full"
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
                                                        labelClassName="w-full"
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
                                                        labelClassName="w-full"
                                                        name="RI_MR_OPT"
                                                        value="FR"
                                                        onChange={handleChange}
                                                        ref={register({
                                                            required:
                                                                'Please select the items you would like released.',
                                                        })}
                                                    />
                                                    <Box className="pl-8 space-y-2 flex flex-col md:flex-row">
                                                        <CheckboxWrapper className="w-full">
                                                            <Checkbox
                                                                label="Emergency/Urgent Care Physician Report"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="EUR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                            <Checkbox
                                                                label="Consultation Report"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="CR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                            <Checkbox
                                                                label="Laboratory Reports"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="LR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                            <Checkbox
                                                                label="Newborn Record"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="NR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                        </CheckboxWrapper>
                                                        <CheckboxWrapper className="w-full">
                                                            <Checkbox
                                                                label="History and Physical Report"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="HPR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                            <Checkbox
                                                                label="Operative Report"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="OR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                            <Checkbox
                                                                label="Pathology Report"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="PR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                            <Checkbox
                                                                label="Immunization Record"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="IR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                        </CheckboxWrapper>
                                                        <CheckboxWrapper className="w-full">
                                                            <Checkbox
                                                                label="Discharge Summary Report"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="DSR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                            <Checkbox
                                                                label="Anesthesia Records"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="AR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                            <Checkbox
                                                                label="Radiology Report"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="RR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                            <Checkbox
                                                                label="Therapy Records"
                                                                labelClassName="w-full"
                                                                name="RI_MR_FR_CB"
                                                                value="TR"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                ref={register}
                                                            />
                                                        </CheckboxWrapper>
                                                    </Box>
                                                </Box>
                                            )}

                                            <Checkbox
                                                label="Itemized Billing"
                                                labelClassName="w-full"
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
                                                labelClassName="w-full"
                                                name="RI_CB"
                                                value="RI"
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please select the items you would like released.',
                                                })}
                                            >
                                                The Radiology Department will
                                                follow up if any charges or
                                                additional information is
                                                required.
                                            </Checkbox>
                                            <Checkbox
                                                label="Pathology Slides"
                                                labelClassName="w-full"
                                                name="RI_CB"
                                                value="PS"
                                                onChange={handleChange}
                                                ref={register({
                                                    required:
                                                        'Please select the items you would like released.',
                                                })}
                                            >
                                                The Pathology Department will
                                                follow up if any charges or
                                                additional information is
                                                required.
                                            </Checkbox>
                                        </CheckboxWrapper>

                                        {errors.RI_CB && (
                                            <ErrorMessage
                                                message={errors.RI_CB.message}
                                            />
                                        )}

                                        {watchRequestedInformation.includes(
                                            'MR'
                                        ) && (
                                            <>
                                                <Info
                                                    secondaryText="Medical Records and Itemized Billing will be delivered electronically through this website."
                                                    className="mt-4"
                                                />
                                                <Box className="mt-4">
                                                    <p className="text-sm font-bold mb-2">
                                                        The following
                                                        information will not be
                                                        released unless
                                                        specifically authorized
                                                        by checking the relevant
                                                        box(es) below:
                                                    </p>
                                                    <CheckboxWrapper>
                                                        <Checkbox
                                                            name="RI_MR_AI_CB"
                                                            label="Information pertaining to mental health diagnosis or treatment"
                                                            value="IPM"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            name="RI_MR_AI_CB"
                                                            label="Information pertaining to drug and alcohol abuse, diagnosis, or treatment"
                                                            value="IPD"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            name="RI_MR_AI_CB"
                                                            label="HIV/AIDS test results"
                                                            value="HIV"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            name="RI_MR_AI_CB"
                                                            label="Genetic testing information"
                                                            value="GTI"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                        <Checkbox
                                                            name="RI_MR_AI_CB"
                                                            label="Worker's Comp information"
                                                            value="WCI"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            ref={register}
                                                        />
                                                    </CheckboxWrapper>
                                                </Box>
                                            </>
                                        )}
                                        {watchRequestedInformation.includes(
                                            'IB'
                                        ) && (
                                            <Info
                                                secondaryText="Medical Records and Itemized Billing will be delivered electronically through this website."
                                                className="mt-4"
                                            />
                                        )}

                                        {watchRequestedInformation.includes(
                                            'RI'
                                        ) && (
                                            <Info
                                                secondaryText="Radiology CDs and Pathology slides will be sent via US Mail or can be picked up at the facility. You will choose below how you would like them delivered."
                                                className="mt-4"
                                            />
                                        )}

                                        {watchRequestedInformation.includes(
                                            'PS'
                                        ) && (
                                            <Info
                                                secondaryText="Radiology CDs and Pathology slides will be sent via US Mail or can be picked up at the facility. You will choose below how you would like them delivered."
                                                className="mt-4"
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </FormSection>

                            <FormSection>
                                <SectionHeading>
                                    Purpose of Request
                                </SectionHeading>
                                <Box>
                                    <Box>
                                        <p className="mb-2">
                                            Please enter your reason for
                                            requesting records.
                                        </p>

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
                                <SectionHeading>
                                    Your Information
                                </SectionHeading>
                                <Box>
                                    <Box className="mb-4">
                                        <Label htmlFor="YI_NOTICE_DD">
                                            Preferred Notification Method
                                        </Label>
                                        <Select
                                            name="YI_NOTICE_DD"
                                            id="YI_NOTICE_DD"
                                            className="w-full mt-1"
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
                                    <Flex className="flex-col sm:flex-row sm:mb-4">
                                        <Box className="mr-4 mb-4 sm:mb-0">
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
                                                })}
                                            />
                                            {errors.YI_PHC && (
                                                <ErrorMessage
                                                    message={
                                                        errors.YI_PN.message
                                                    }
                                                />
                                            )}
                                        </Box>
                                        <Box>
                                            <Label htmlFor="YI_PHT_DD">
                                                Type
                                            </Label>
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
                                                <option
                                                    key="mobile"
                                                    value="mobile"
                                                >
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
                                                            getValues().YI_PN ||
                                                        'The phone numbers you entered do not match!',
                                                },
                                            })}
                                        />
                                        {errors.YI_PHC && (
                                            <ErrorMessage
                                                message={errors.YI_PHC.message}
                                            />
                                        )}
                                    </Box>
                                    <Box className="mb-4">
                                        <Label htmlFor="YI_EM">
                                            Email Address
                                        </Label>
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
                                                            getValues().YI_EM ||
                                                        'The email addresses you entered do not match.',
                                                },
                                            })}
                                        />
                                        {errors.YI_EMC && (
                                            <ErrorMessage
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
                                    <p className="mb-4">
                                        Normal processing time is 5 business
                                        days from time of receipt. Please
                                        contact us if you have any questions.
                                    </p>

                                    {watchFacilityCheckboxes.includes(
                                        'P7202-1'
                                    ) && (
                                        <p className="mb-2">
                                            <span className="font-bold">
                                                PIH Health Hospital - Downey:
                                            </span>{' '}
                                            (562) 904-5166 x26177
                                        </p>
                                    )}

                                    {watchFacilityCheckboxes.includes(
                                        'P7201-1'
                                    ) && (
                                        <p className="mb-2">
                                            <span className="font-bold">
                                                PIH Health Hospital - Whittier:
                                            </span>{' '}
                                            (562) 698-0811 x13685
                                        </p>
                                    )}

                                    {watchFacilityCheckboxes.includes(
                                        'P7203-1'
                                    ) && (
                                        <p className="mb-2">
                                            <span className="font-bold">
                                                PIH Health Physicians:
                                            </span>{' '}
                                            (562) 698-0811 x13858
                                        </p>
                                    )}
                                </Box>
                            </FormSection>

                            <ButtonWrapper>
                                <Button variant="outline" className="flex-grow">
                                    Cancel
                                </Button>
                                <Input
                                    variant="filled"
                                    className="flex-grow text-white font-bold bg-primary hover:bg-tertiary hover:text-black focus:bg-gray-dark focus:border-gray-dark"
                                    type="submit"
                                    value="Continue"
                                />
                            </ButtonWrapper>
                        </FormWrapper>
                    </Box>
                )}

                {currentStep === 2 && (
                    <Box className="max-w-screen-md space-y-8 pb-8">
                        <PageHeading>Upload Authorization</PageHeading>
                        <Box className="pb-8 border-b border-gray-light">
                            <Text as="p" className="pb-4">
                                Your request has been saved and assigned
                                tracking number(s):{' '}
                                <span className="font-bold">81-196019</span>.
                            </Text>
                            <Text as="p" className="pb-4">
                                Please contact the following facility/facilities
                                if you have any questions during this process:
                            </Text>
                            <Text as="p" className="pb-4">
                                <span className="font-bold">81-196019</span>:
                                Palomar Health Medical Records - (760) 480-7911
                            </Text>
                        </Box>
                        <Box>
                            <Text as="p" className="pb-4 leading-relaxed">
                                <span className="font-bold">
                                    All requests for medical records require
                                    printing out, signing, and uploading an
                                    image of this{' '}
                                    <Link
                                        href="#"
                                        className="underline text-blue"
                                    >
                                        authorization form
                                    </Link>
                                    .
                                </span>{' '}
                                Note that your driver's license or other
                                government issued identification is required in
                                the authorization form where indicated. If you
                                are requesting medical records as the
                                representative of, patient, copies of
                                documentation establishing your authority to
                                release medical records on the patient's behalf
                                are required and must be provided through the
                                secure upload below.{' '}
                                {/* TODO: Figure out the destination of this link */}
                                <Link href="#" className="underline text-blue">
                                    Click here for examples.
                                </Link>{' '}
                                If you have any questions regarding the
                                documentation needed for your request, please
                                contact us at the number above.
                            </Text>
                            <Text as="p" className="pb-4">
                                To complete your request:
                            </Text>
                            <Box as="ul" className="pl-8 pb-4 list-decimal">
                                <Box as="li" className="pb-2">
                                    Print out and sign this authorization form
                                    along with a copy of a government-issued
                                    picture ID,
                                </Box>
                                <Box as="li" className="pb-2">
                                    Scan or photograph all pages of the form
                                    along with your government ID,
                                </Box>
                                <Box as="li" className="pb-2">
                                    If requesting on behalf of a patient, scan
                                    or photograph all pages of the additional
                                    required documentation,
                                </Box>
                                <Box as="li" className="pb-2">
                                    Upload all photos/scans in the area below,
                                    and
                                </Box>
                                <Box as="li" className="pb-2">
                                    Click{' '}
                                    <span className="font-bold">Continue</span>{' '}
                                    below.
                                </Box>
                            </Box>

                            <Text as="p" className="pb-4 font-bold">
                                Please note the following:
                            </Text>

                            <Box as="ul" className="pl-8 pb-4 list-disc">
                                <Box as="li" className="pb-2">
                                    If you are unable to submit the required
                                    images/documentation at this time, you may
                                    return to this screen by entering your
                                    tracking number on the main menu and
                                    following the prompts to log in with a
                                    temporary password that will be sent to
                                    you."{' '}
                                    <span className="font-bold">
                                        You must upload the required
                                        documentation within 72 hours or your
                                        request will be canceled.
                                    </span>
                                </Box>
                                <Box as="li" className="pb-2">
                                    The files you upload must have PDF,
                                    JPG/JPEG, TIF/TIFF, or PNG as their
                                    extension.
                                </Box>
                                <Box as="li" className="pb-2">
                                    Uploaded files must be less than 10 MB in
                                    size. If your files are too large, consult
                                    your device's documentation for instructions
                                    on lowering the resolution and/or color
                                    depth and compressing the file.
                                </Box>
                                <Box as="li" className="pb-2">
                                    This site will automatically log you out if
                                    you are inactive or switch away from your
                                    browser to another app for 10 minutes.
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <SectionHeading>
                                Upload Your Documentation Here
                            </SectionHeading>
                            <FormProvider>
                                <FormWrapper>
                                    <FileInput />
                                </FormWrapper>
                            </FormProvider>
                            <UploadsList className="mt-8" />
                        </Box>
                        {/* TODO: Add correct buttons here */}
                        <ButtonWrapper>
                            <Button variant="outline" className="flex-grow">
                                Cancel and Delete Request
                            </Button>
                            <Button variant="filled" className="flex-grow">
                                Submit Request for Processing
                            </Button>
                        </ButtonWrapper>
                    </Box>
                )}
                {currentStep === 3 && (
                    <Box className="max-w-screen-md space-y-8 pb-8">
                        <PageHeading>Review & Submit</PageHeading>
                        <Text as="p" className="leading-relaxed">
                            Please review your submission below for accuracy. If
                            there are any errors, please click here to correct
                            them. (/patient/editrequest) Errors such as patient
                            name misspelling, incorrect date of birth, or
                            incorrect dates of service may result in your
                            request being canceled. If there are no errors and
                            you have uploaded all required documentation, you
                            must click "Submit Request for Processing" below to
                            complete submission of your request. Normal
                            processing time is 7-14 days after submission.
                        </Text>

                        <Box className="space-y-4">
                            <SectionHeading className="uppercase">
                                Request(s) Summary
                            </SectionHeading>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Tracking Number(s):
                                </span>{' '}
                                67-192171, 68-150595, 69-156512
                            </Text>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Patient Name:
                                </span>{' '}
                                DONALD WHITE{' '}
                            </Text>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Patient DOB:
                                </span>{' '}
                                3/3/1977
                            </Text>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Dates of Service:{' '}
                                </span>
                                Most recent visit{' '}
                            </Text>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Requested Information:{' '}
                                </span>
                                Medical Records: PERTINENT; Itemized Billing;
                                Radiology Images; Pathology Slides
                            </Text>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Purpose of Request:{' '}
                                </span>
                                test
                            </Text>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Limitations:{' '}
                                </span>
                                None{' '}
                            </Text>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Phone:{' '}
                                </span>
                                (858) 254-8585
                            </Text>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Email:{' '}
                                </span>
                                dwhite@abtvault.com
                            </Text>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Delivery Method for Records:{' '}
                                </span>
                            </Text>
                            <Text as="p">
                                <span className="block text-sm font-bold">
                                    Delivery Method for CDs/Slides:{' '}
                                </span>
                                TRIMSNet e-Request Website Pick up CDs and/or
                                slides at the facility.
                            </Text>
                            <Button variant="outline" className="flex-grow">
                                Edit Request Information
                            </Button>
                        </Box>
                        <Box className="space-y-4">
                            <SectionHeading className="uppercase">
                                Uploaded Files
                            </SectionHeading>
                            <UploadsList />
                            <Button variant="outline" className="flex-grow">
                                Upload Additional Documentation
                            </Button>
                        </Box>
                        <ButtonWrapper>
                            <Button variant="outline" className="flex-grow">
                                Cancel and Delete Request
                            </Button>
                            <Button variant="filled" className="flex-grow">
                                Submit Request for Processing
                            </Button>
                        </ButtonWrapper>
                    </Box>
                )}
            </Container>
        </Layout>
    )
}

export default withStore(PIHPatientRequest)
