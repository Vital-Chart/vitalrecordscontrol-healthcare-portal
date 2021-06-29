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
                    secondaryAlertText="Auctor id pellentesque faucibus taciti sociis consectetur vitae accumsan, eu class diam convallis elementum fames porttitor iaculis mauris, vivamus est mi rhoncus facilisi platea natoque."
                />
            ) : null}
        </>
    )
}

export default ContinuedRequestAlert
