import { useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import MicroModal from 'react-micro-modal'
import DatePicker from 'react-datepicker'
import { withStore } from '@/lib/store'
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
    ButtonWrapper,
    Stepper,
} from '@/components/atoms'

import IconQuestion from '@/icons/icon-question.svg'
import IconClose from '@/icons/icon-close.svg'

const PIHForm = ({ store }) => {
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        errors,
        control,
    } = useForm({
        defaultValues: store.state.form,
    })

    const watchFacilityCheckboxes = watch('FI_CB', [])
    const watchRequestedInformation = watch('RI_CB', [])
    const watchVisitOptions = watch('VI_OPT', [])

    const handleChange = e => {
        const formValues = getValues()

        store.dispatch({
            type: 'UPDATE_FORM',
            name: e.target.name,
            value: formValues[e.target.name],
        })
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()

        try {
            const res = await fetch(
                process.env.CREATE_UPDATE_REQUEST_ENDPOINT,
                {
                    method: 'POST',
                    body: createFormData(data),
                }
            )

            const json = await res.json()

            console.log(json)

            // Handle response
        } catch (e) {
            // Handle error
        }
    }

    const createFormData = data => {
        const formData = new FormData()

        Object.keys(data).map(key => {
            const value = data[key]
            let fieldValue = value

            // Create comma separated strings from array values
            if (Array.isArray(value)) {
                fieldValue = value.join()
            }

            formData.append(key, fieldValue)
        })

        return formData
    }

    return (
        <Layout>
            <Stepper />
            <Container>
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
                                <Box as="fieldset" className="mb-4">
                                    <Box as="legend">Patient Date of Birth</Box>

                                    <Controller
                                        control={control}
                                        name="PI_DOB"
                                        rules={{
                                            required:
                                                "Please enter the patient's date of birth.",
                                        }}
                                        render={({
                                            onChange,
                                            onBlur,
                                            value,
                                        }) => (
                                            <DatePicker
                                                // https://reactdatepicker.com/#example-custom-header
                                                onChange={date => {
                                                    onChange(date)

                                                    store.dispatch({
                                                        type: 'UPDATE_FORM',
                                                        name: 'PI_DOB',
                                                        value: date,
                                                    })
                                                }}
                                                onBlur={onBlur}
                                                selected={
                                                    value
                                                        ? new Date(value)
                                                        : null
                                                }
                                                maxDate={new Date()}
                                                dateFormat="MMMM d, yyyy"
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                customInput={<Input />}
                                            />
                                        )}
                                    />
                                    {/*
                                        {errors.PI_DOB && (
                                            <ErrorMessage
                                                message={
                                                    errors.birthMonth.message
                                                }
                                            />
                                        )} */}
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
                                                        errors.VI_OPT.message
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
                                                                Service Start:
                                                            </Label>

                                                            <Controller
                                                                control={
                                                                    control
                                                                }
                                                                name="VI_DR_SD"
                                                                rules={{
                                                                    required: true,
                                                                }}
                                                                render={({
                                                                    onChange,
                                                                    onBlur,
                                                                    value,
                                                                }) => (
                                                                    <DatePicker
                                                                        // https://reactdatepicker.com/#example-custom-header
                                                                        onChange={date => {
                                                                            onChange(
                                                                                date
                                                                            )

                                                                            store.dispatch(
                                                                                {
                                                                                    type:
                                                                                        'UPDATE_FORM',
                                                                                    name:
                                                                                        'VI_DR_SD',
                                                                                    value: date,
                                                                                }
                                                                            )
                                                                        }}
                                                                        onBlur={
                                                                            onBlur
                                                                        }
                                                                        selected={
                                                                            value
                                                                                ? new Date(
                                                                                      value
                                                                                  )
                                                                                : new Date()
                                                                        }
                                                                        maxDate={
                                                                            new Date()
                                                                        }
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        customInput={
                                                                            <Input className="mr-4" />
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        </Box>

                                                        <Box>
                                                            <Label className="block mb-1">
                                                                Service End:
                                                            </Label>

                                                            <Controller
                                                                control={
                                                                    control
                                                                }
                                                                name="VI_DR_ED"
                                                                rules={{
                                                                    required: true,
                                                                }}
                                                                render={({
                                                                    onChange,
                                                                    onBlur,
                                                                    value,
                                                                }) => (
                                                                    <DatePicker
                                                                        // https://reactdatepicker.com/#example-custom-header
                                                                        onChange={date => {
                                                                            onChange(
                                                                                date
                                                                            )

                                                                            store.dispatch(
                                                                                {
                                                                                    type:
                                                                                        'UPDATE_FORM',
                                                                                    name:
                                                                                        'VI_DR_ED',
                                                                                    value: date,
                                                                                }
                                                                            )
                                                                        }}
                                                                        onBlur={
                                                                            onBlur
                                                                        }
                                                                        selected={
                                                                            value
                                                                                ? new Date(
                                                                                      value
                                                                                  )
                                                                                : new Date()
                                                                        }
                                                                        maxDate={
                                                                            new Date()
                                                                        }
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        customInput={
                                                                            <Input />
                                                                        }
                                                                    />
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
                                        Please select the type of information
                                        you would like released:
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
                                            The Radiology Department will follow
                                            up if any charges or additional
                                            information is required.
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
                                            The Pathology Department will follow
                                            up if any charges or additional
                                            information is required.
                                        </Checkbox>
                                    </CheckboxWrapper>

                                    {errors.RI_CB && (
                                        <ErrorMessage
                                            message={errors.RI_CB.message}
                                        />
                                    )}

                                    {watchRequestedInformation.some(i =>
                                        ['MR', 'IB'].includes(i)
                                    ) && (
                                        <Info
                                            secondaryText="Medical Records and Itemized Billing will be delivered electronically through this website."
                                            className="mt-4"
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

                                    {watchRequestedInformation.some(i =>
                                        ['RI', 'PS'].includes(i)
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
                                    <Flex className="items-center">
                                        <Label htmlFor="YI_NOTICE_DD">
                                            Preferred Notification Method
                                        </Label>
                                        {/* <MicroModal
                                                trigger={handleOpen => (
                                                    <IconQuestion
                                                        onClick={handleOpen}
                                                        className="h-5 w-5 ml-2 text-blue cursor-pointer"
                                                    />
                                                )}
                                                children={handleClose => (
                                                    <Box className="px-8 py-4 relative">
                                                        <button
                                                            onClick={
                                                                handleClose
                                                            }
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
                                                        </button>

                                                        <Box>
                                                            <Text
                                                                className="text-xl font-bold"
                                                            >
                                                                Preferred
                                                                Notification
                                                                Method
                                                            </Text>
                                                            <Text>
                                                                This is the
                                                                method by which
                                                                you would like
                                                                to receive
                                                                automatic
                                                                notifications of
                                                                the progress of
                                                                your request(s),
                                                                as well as how
                                                                you will receive
                                                                password updates
                                                                from this
                                                                website. If we
                                                                have specific
                                                                questions about
                                                                your request, we
                                                                will call you at
                                                                the phone number
                                                                listed.
                                                            </Text>
                                                        </Box>
                                                    </Box>
                                                )}
                                            /> */}
                                    </Flex>
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
                                        {errors.YI_PN && (
                                            <ErrorMessage
                                                message={errors.YI_PN.message}
                                            />
                                        )}
                                    </Box>
                                    <Box>
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
                                <Text className="mb-4">
                                    Normal processing time is 5 business days
                                    from time of receipt. Please contact us if
                                    you have any questions.
                                </Text>

                                {watchFacilityCheckboxes.includes(
                                    'P7202-1'
                                ) && (
                                    <Text className="mb-2">
                                        <Text as="span" className="font-bold">
                                            PIH Health Hospital - Downey:
                                        </Text>{' '}
                                        (562) 904-5166 x26177
                                    </Text>
                                )}

                                {watchFacilityCheckboxes.includes(
                                    'P7201-1'
                                ) && (
                                    <Text className="mb-2">
                                        <Text as="span" className="font-bold">
                                            PIH Health Hospital - Whittier:
                                        </Text>{' '}
                                        (562) 698-0811 x13685
                                    </Text>
                                )}

                                {watchFacilityCheckboxes.includes(
                                    'P7203-1'
                                ) && (
                                    <Text className="mb-2">
                                        <Text as="span" className="font-bold">
                                            PIH Health Physicians:
                                        </Text>{' '}
                                        (562) 698-0811 x13858
                                    </Text>
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
            </Container>
        </Layout>
    )
}

export default withStore(PIHForm)
