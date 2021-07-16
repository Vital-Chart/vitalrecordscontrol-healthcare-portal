import cx from 'classnames'
import { useStore } from '@/lib/store'
import { Alert } from '@/components/atoms'

export const ContinuedRequestAlert = ({ className }) => {
    const store = useStore()
    return (
        <>
            {store.state.continuedRequest ? (
                <Alert
                    className={cx(className, 'mt-8 max-w-screen-md')}
                    primaryAlertText="You are continuing a request."
                    secondaryAlertText="Please review the information on the form below and click Continue to upload files and submit your request for processing."
                />
            ) : null}
        </>
    )
}

export default ContinuedRequestAlert
