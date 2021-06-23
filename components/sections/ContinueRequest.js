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

import IconClose from '@/icons/icon-close.svg'
import IconLoading from '@/icons/icon-loading.svg'

// TODO: Figure out how to indicate invalid data in form

const ContinueRequestForm = ({ setRequestStatus }) => {
    const store = useStore()
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
                console.log({ errorInformation })
                setServerErrors(
                    errorInformation.map(error => error.errorNumber)
                )
                setIsFetching(false)
            } else {
                store.dispatch({
                    type: 'UPDATE_TRACKING_NUMBER',
                    value: trackingNumbers,
                })

                store.dispatch({
                    type: 'UPDATE_FORM',
                    value: fields,
                })

                setIsFetching(false)
            }
        } catch (error) {
            // General server error
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
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="TRKNUM">Tracking Number</Label>
                <Input
                    type="text"
                    name="TRKNUM"
                    id="TRKNUM"
                    value="tr_662"
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
                    value="05/11/2021"
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
                    value="99402979633"
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
                {/* <Button variant="filled" onClick={() => goToStep('upload')}>
                    Next Step
                </Button> */}
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

const RequestOld = () => {
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

export const ContinueRequest = () => {
    const [requestStatus, setRequestStatus] = useState(undefined)

    return (
        <>
            {/* TODO: Setup form validation for continue request form */}
            <MicroModal
                trigger={handleOpen => (
                    <Button onClick={handleOpen} variant="filledSecondary">
                        Continue Request
                    </Button>
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
                            {requestStatus === 'Submitted' && (
                                <RequestSubmitted />
                            )}
                            {requestStatus === 'Old' && <RequestOld />}
                            {requestStatus === 'Invalid' && <RequestInvalid />}
                        </Box>
                    </Box>
                )}
            />
        </>
    )
}

export default ContinueRequest
