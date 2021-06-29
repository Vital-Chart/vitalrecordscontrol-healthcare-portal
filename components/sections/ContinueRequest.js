import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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

import IconClose from '@/icons/icon-close.svg'
import IconLoading from '@/icons/icon-loading.svg'
import IconArrow from '@/icons/icon-arrow-narrow-right.svg'

const ContinueRequestForm = ({ setRequestStatus }) => {
    const store = useStore()
    const router = useRouter()
    const { hospital, goToStep } = useNavigation()
    const facilityId = hospitals[hospital].facilities[0].id

    const [serverErrors, setServerErrors] = useState([])
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

        // 100012	Tracking Number already Completed
        // setRequestStatus('Submitted')

        // 100013	Tracking Number information too old (72 hours)
        // Need to close modal after
        // setRequestStatus('Old')

        // setRequestStatus('Invalid')

        // 100014	Tracking Number locked - too many failed access attempts

        //          ? How many access attempts?
        // ???      Incorrect Phone
        // ???      Incorrect DOB

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

                console.log({ errorInformation })

                // Put all of the error numbers in an array
                const errorNumbers = errorInformation.map(
                    error => error.errorNumber
                )

                if (errorNumbers.includes(100012)) {
                    setRequestStatus('submitted')
                } else if (errorNumbers.includes(100013)) {
                    setRequestStatus('expired')
                } else if (errorNumbers.includes(100014)) {
                    setRequestStatus('locked')
                } else {
                    setServerErrors(errorNumbers)
                }
            } else {
                store.dispatch({
                    type: 'CONTINUE_REQUEST',
                    trackingNumbers,
                    form: fields,
                })

                setIsFetching(false)

                // goToStep('form')

                // router.push(`/${hospital}/patient/form`)
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
                Ad ac ligula sociosqu tempus vulputate hendrerit porta mauris
                faucibus ut montes.
            </Text>
            {/* TODO: Remove hard-coded values from form */}
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="TRKNUM">Tracking Number</Label>
                <Input
                    type="text"
                    name="TRKNUM"
                    id="TRKNUM"
                    className="w-full mt-1"
                    ref={register({
                        required: 'Please enter a tracking number.',
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
                    ref={register({
                        required: "Please enter the patient's DOB.",
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
                    value="P7110-1"
                    // value={facilityId}
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

const RequestExpired = () => {
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
            <Button as={Link} href={`${hospital}/#newRequest`} variant="filled">
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
    const store = useStore()
    const { hospital } = useNavigation()
    const router = useRouter()

    useEffect(() => {
        if (store.state.continuedRequest) {
            router.push(`/${hospital}/patient/form`)
        }
    }, [store.state.continuedRequest])

    return (
        <>
            {/* TODO: Setup form validation for continue request form */}
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
                    // <Button
                    //     onClick={handleOpen}
                    //     variant="filledSecondary"
                    //     className="m-2"
                    //     styles={customButtonStyles}
                    // >
                    //     Continue Request
                    // </Button>
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
                            {requestStatus === 'submitted' && (
                                <RequestSubmitted />
                            )}
                            {requestStatus === 'expired' && <RequestExpired />}
                            {requestStatus === 'locked' && <RequestLocked />}
                            {requestStatus === 'invalid' && <RequestInvalid />}
                        </Box>
                    </Box>
                )}
            />
        </>
    )
}

export default ContinueRequest
