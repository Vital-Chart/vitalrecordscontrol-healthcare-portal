import { useState } from 'react'
import dynamic from 'next/dynamic'
import cx from 'classnames'
import * as dayjs from 'dayjs'
const MicroModal = dynamic(() => import('react-micro-modal'), { ssr: false })
import { useForm } from 'react-hook-form'
import { withStore } from '@/lib/store'
import { createRequest } from '@/lib/api'
import { states } from '@/lib/helpers'
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

    const [serverErrors, setServerErrors] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const watchFacilityCheckboxes = watch('FI_CB', [])
    const watchRequestedInformation = watch('RI_CB', [])
    const watchVisitOptions = watch('VI_OPT', [])
    const watchDeliveryMethod = watch('DI_DM_DD', [])

    const handleChange = e => {
        store.dispatch({
            type: 'UPDATE_FORM',
            value: getValues(),
        })
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()

        setIsFetching(true)
        setServerErrors([])

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
                        New Medical Records Request
                    </PageHeading>

                    {/* TODO: Display general/server errors */}
                    {/* https://docs.google.com/spreadsheets/d/1sF0eOAiIbYGjvKwiNx3VPiXUXVr3fvYuK3lxcB8JHOE/edit?ts=60257605#gid=1766959036 */}

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
                                    : '-1'
                            }
                            ref={register}
                        />

                        <FormSection>
                            <SectionHeading>
                                Facility / Facilities
                            </SectionHeading>
                            {Array.isArray(store.state.trackingNumbers) && (
                                <Alert
                                    className="my-4"
                                    primaryAlertText="Your request has been initiated. You cannot change facilities for this request."
                                    secondaryAlertText="If you'd like to request records from a different facility, please start a new request."
                                />
                            )}
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
                                        disabled={Array.isArray(
                                            store.state.trackingNumbers
                                        )}
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
                                        disabled={Array.isArray(
                                            store.state.trackingNumbers
                                        )}
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
                                        disabled={Array.isArray(
                                            store.state.trackingNumbers
                                        )}
                                        ref={register({
                                            required:
                                                'Please select at least one facility.',
                                        })}
                                    />
                                    {errors.FI_CB && (
                                        <ErrorMessage
                                            className="my-2"
                                            message={errors.FI_CB.message}
                                        />
                                    )}
                                </CheckboxWrapper>
                            </Box>

                            {watchFacilityCheckboxes.length > 0 &&
                                !Array.isArray(store.state.trackingNumbers) && (
                                    <Alert
                                        className="my-4"
                                        primaryAlertText="Once you hit 'Continue' below, you cannot change which facilities you are requesting from."
                                        secondaryAlertText="Please double-check to make sure you select the correct facility or facilities."
                                    />
                                )}

                            {watchFacilityCheckboxes.length > 1 && (
                                <Info
                                    primaryText="You have selected more than one facility."
                                    secondaryText="You will receive SEPARATE tracking numbers for each facility. Each facility processes requests individually."
                                    className="my-4"
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
                                                className="my-2"
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
                                                className="my-2"
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
                                        type="date"
                                        name="PI_DOB"
                                        id="PI_DOB"
                                        className="w-full mt-1"
                                        max={dayjs().format('YYYY-MM-DD')}
                                        onChange={handleChange}
                                        ref={register({
                                            required:
                                                "Please enter the patient's date of birth.",
                                        })}
                                    />

                                    {errors.PI_DOB && (
                                        <ErrorMessage
                                            className="my-2"
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
                                                    className="my-2"
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
                                                                    type="date"
                                                                    name="VI_DR_SD"
                                                                    id="VI_DR_SD"
                                                                    className="w-full"
                                                                    max={dayjs().format(
                                                                        'YYYY-MM-DD'
                                                                    )}
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
                                                                <Label
                                                                    htmlFor="VI_DR_ED"
                                                                    className="block mb-1"
                                                                >
                                                                    Service End:
                                                                </Label>
                                                                <Input
                                                                    type="date"
                                                                    name="VI_DR_ED"
                                                                    id="VI_DR_ED"
                                                                    className="w-full"
                                                                    max={dayjs().format(
                                                                        'YYYY-MM-DD'
                                                                    )}
                                                                    onChange={
                                                                        handleChange
                                                                    }
                                                                    ref={register(
                                                                        {
                                                                            required: true,
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
                                                                        }
                                                                    )}
                                                                />
                                                            </Box>
                                                        </Flex>

                                                        {errors.VI_DR_ED && (
                                                            <ErrorMessage
                                                                className="my-2"
                                                                message={
                                                                    errors
                                                                        .VI_DR_ED
                                                                        .message
                                                                }
                                                            />
                                                        )}
                                                    </>
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
                                                className="my-2"
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
                                            className="my-2"
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
                                            className="my-2"
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
                                                <IconQuestion
                                                    onClick={handleOpen}
                                                    className="h-5 w-5 ml-2 text-blue cursor-pointer"
                                                />
                                            )}
                                            children={handleClose => (
                                                <Box className="p-8 relative">
                                                    <button
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
                                                    </button>

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
                                                pattern: {
                                                    value: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                                                    message:
                                                        'Please enter a valid phone number.',
                                                },
                                            })}
                                        />
                                        {errors.YI_PN && (
                                            <ErrorMessage
                                                className="my-2"
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
                                                        getValues('YI_PN') ||
                                                    'The phone numbers you entered do not match!',
                                            },
                                        })}
                                    />
                                    {errors.YI_PHC && (
                                        <ErrorMessage
                                            className="my-2"
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
                                            className="my-2"
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
                                            className="my-2"
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
                                    {/* TODO: Update route to pull from store/auth routing */}
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
                                                    className="my-2"
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
                                                        className="my-2"
                                                        message={
                                                            errors.DI_NM.message
                                                        }
                                                    />
                                                )}

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
                                                        className="my-2"
                                                        message={
                                                            errors.DI_ADDR1
                                                                .message
                                                        }
                                                    />
                                                )}

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
                                                        className="my-2"
                                                        message={
                                                            errors.DI_CITY
                                                                .message
                                                        }
                                                    />
                                                )}
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
                                                                className="my-2"
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
                                                                className="my-2"
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

                        {/* <ServerErrorList
                            className="my-4"
                            errors={[100000, 100001]}
                        /> */}

                        <ButtonWrapper className="pb-8">
                            <Button
                                as={Link}
                                href={getLandingPage()}
                                variant="outline"
                                className="flex-1"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="filled"
                                disabled={isFetching}
                                className={cx(
                                    'flex-1',
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
