import { useState } from 'react'
import dynamic from 'next/dynamic'
const MicroModal = dynamic(() => import('react-micro-modal'), { ssr: false })
import { useForm } from 'react-hook-form/dist/index.ie11'
import cx from 'classnames'
import useNavigation from '@/lib/useNavigation'
import { continueRequest } from '@/lib/api'
import { useStore } from '@/lib/store'
import { Text, Box, Button, Link, Input, Label } from '@/components/core'
import { ScreenReader } from '@/components/general'
import { ErrorMessage, ServerErrorList } from '@/components/atoms'
import hospitals from '@/lib/hospitals'
import { regexPatterns } from '@/lib/helpers'

import IconClose from '@/icons/icon-close.svg'
import IconLoading from '@/icons/icon-loading.svg'
import IconArrow from '@/icons/icon-arrow-narrow-right.svg'

const ContinueRequestForm = ({ setRequestStatus }) => {
    const store = useStore()
    const { hospital } = useNavigation()
    const facilityId = hospitals[hospital].facilities[0].id
    const [serverErrors, setServerErrors] = useState([])
    const [infoIsInvalid, setInfoIsInvalid] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data, e) => {
        e.preventDefault()
        setServerErrors([])
        setIsFetching(true)
        setInfoIsInvalid(false)

        store.dispatch({
            type: 'RESET_REQUEST',
        })

        try {
            const {
                trackingNumbers,
                inError,
                errorInformation,
                File,
                ...fields
            } = await continueRequest(data)

            if (inError) {
                setIsFetching(false)

                // Put all of the error numbers in an array
                const errorNumbers = errorInformation.map(
                    error => error.errorNumber
                )

                if (
                    // Make sure tracking number, phone, and DOB are valid
                    errorNumbers.some(i => [100001, 100002, 100008].includes(i))
                ) {
                    setInfoIsInvalid(true)
                } else if (errorNumbers.includes(100012)) {
                    setRequestStatus('submitted')
                } else if (errorNumbers.includes(100013)) {
                    setRequestStatus('expired')
                } else if (errorNumbers.includes(100014)) {
                    setRequestStatus('locked')
                } else {
                    setServerErrors(errorNumbers)
                }
            } else {
                // Get the form type (option) based on returned form data
                const formType =
                    fields.FTYPE === 'PAT' ? 'patient' : 'sendtothirdparty'

                store.dispatch({
                    type: 'CONTINUE_REQUEST',
                    trackingNumbers,
                    form: fields,
                    files: File,
                    redirect: `/${hospital}/${formType}/form`,
                    requestId: `${hospital}:${formType}`,
                })

                setIsFetching(false)
            }
        } catch (error) {
            // General server error
            console.error(error)
            setServerErrors([100000])
            setIsFetching(false)
        }
    }
    return (
        <>
            <Text className="text-xl font-bold">
                Continue an Unfinished Request
            </Text>
            <Text className="mb-4">
                Enter your information below to review and finish your request.
            </Text>
            {infoIsInvalid && (
                <Box className="px-6 py-4 mb-4 bg-red-light border-l-4 border-red">
                    <Text className="text-sm">
                        The information you provided does not match a request.
                        Please try again.
                    </Text>
                </Box>
            )}

            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="TRKNUM">Tracking Number</Label>
                <Input
                    type="text"
                    name="TRKNUM"
                    id="TRKNUM"
                    className="w-full mt-1"
                    ref={register({
                        required: 'Please enter a tracking number.',
                        pattern: {
                            value: regexPatterns.trackingNumber,
                            message: 'Please enter a valid tracking number.',
                        },
                    })}
                />

                {errors.TRKNUM && (
                    <ErrorMessage
                        className="mt-2"
                        message={errors.TRKNUM.message}
                    />
                )}

                <Label htmlFor="DOB" className="block mt-2">
                    Patient Date of Birth
                </Label>
                <Input
                    type="text"
                    name="DOB"
                    id="DOB"
                    className="w-full mt-1"
                    placeholder="MM/DD/YYYY"
                    ref={register({
                        required: "Please enter the patient's DOB.",
                        pattern: {
                            value: regexPatterns.date,
                            message: 'Please enter a valid date (MM/DD/YYYY).',
                        },
                    })}
                />

                {errors.DOB && (
                    <ErrorMessage
                        className="mt-2"
                        message={errors.DOB.message}
                    />
                )}

                <Label htmlFor="PhoneNumber" className="block mt-2">
                    Phone Number
                </Label>
                <Input
                    type="tel"
                    name="PhoneNumber"
                    id="PhoneNumber"
                    className="w-full mt-1"
                    ref={register({
                        required: 'Please enter a phone number.',
                        pattern: {
                            value: regexPatterns.phone,
                            message: 'Please enter a valid phone number.',
                        },
                    })}
                />

                {errors.PhoneNumber && (
                    <ErrorMessage
                        className="mt-2"
                        message={errors.PhoneNumber.message}
                    />
                )}

                <Input
                    type="hidden"
                    name="FI_CB"
                    value={facilityId}
                    ref={register}
                />

                <Button
                    type="submit"
                    variant="filled"
                    disabled={isFetching}
                    className={cx('mt-4', isFetching && 'pointer-events-none')}
                >
                    {isFetching ? (
                        <IconLoading className="w-6 text-gray-400 animate-spin" />
                    ) : (
                        <>Submit</>
                    )}
                </Button>

                <ServerErrorList className="my-4" errors={serverErrors} />
            </Box>
        </>
    )
}

const RequestSubmitted = () => (
    <Box className="text-center">
        <Text className="pb-4 mb-4 text-xl font-bold border-b-2 border-gray-light">
            Request Already Submitted
        </Text>
        <Text className="mb-4">
            This request has already been submitted for processing. Click the
            button below to get more information about the status of the
            request.
        </Text>
        <Button
            as={Link}
            href="https://www.myroiplus.com/Prod/V1Account/Login?ReturnUrl=%2fprod"
            variant="filled"
        >
            Track Request
        </Button>
    </Box>
)

const RequestInvalid = () => (
    <Box className="text-center">
        <Text className="pb-4 mb-4 text-xl font-bold border-b-2 border-gray-light">
            Tracking Number Not Found
        </Text>
        <Text className="mb-4">
            Viverra in pretium aliquet velit posuere pharetra luctus sociosqu
            lacinia, ridiculus nisl ornare rhoncus nam fermentum hendrerit
            interdum mi, non hac auctor facilisis dui mollis phasellus nisi.
        </Text>
        <Button as={Link} href="#" variant="filled">
            Track Request
        </Button>
    </Box>
)

const RequestExpired = ({ handleClose }) => {
    const { hospital } = useNavigation()
    return (
        <Box className="text-center">
            <Text className="pb-4 mb-4 text-xl font-bold border-b-2 border-gray-light">
                Request Expired
            </Text>
            <Text className="mb-4">
                It has been more than 72 hours since this request was started.
                Click the button below to start a new request.
            </Text>
            <Button onClick={handleClose} variant="filled">
                Start New Request
            </Button>
        </Box>
    )
}

const RequestLocked = () => {
    const { hospital } = useNavigation()
    return (
        <Box className="text-center">
            <Text className="pb-4 mb-4 text-xl font-bold border-b-2 border-gray-light">
                Request Locked
            </Text>
            <Text className="mb-4">This request has been locked...</Text>
            <Button as={Link} href={`${hospital}/#newRequest`} variant="filled">
                Start New Request
            </Button>
        </Box>
    )
}

export const ContinueRequest = () => {
    const [requestStatus, setRequestStatus] = useState(undefined)

    return (
        <MicroModal
            trigger={handleOpen => (
                <Box
                    as={Button}
                    onClick={handleOpen}
                    className="flex items-center m-2 px-2 pt-4 pb-2 font-bold text-sm text-white border-b-2 border-white hover:opacity-50 transition-opacity"
                >
                    <Text as="span" className="pr-2">
                        Continue a request I started previously.
                    </Text>{' '}
                    <IconArrow className="h-6 w-6" />
                </Box>
            )}
            children={handleClose => (
                <Box className="p-8 relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-0 right-0 h-4 w-4 text-blue cursor-pointer"
                    >
                        <IconClose onClick={handleClose} />
                        <ScreenReader>Close</ScreenReader>
                    </button>

                    <Box>
                        {!requestStatus && (
                            <ContinueRequestForm
                                setRequestStatus={setRequestStatus}
                            />
                        )}
                        {requestStatus === 'submitted' && <RequestSubmitted />}
                        {requestStatus === 'expired' && (
                            <RequestExpired handleClose={handleClose} />
                        )}
                        {requestStatus === 'locked' && <RequestLocked />}
                        {requestStatus === 'invalid' && <RequestInvalid />}
                    </Box>
                </Box>
            )}
        />
    )
}

export default ContinueRequest
