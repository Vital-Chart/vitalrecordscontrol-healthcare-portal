import { useFormContext } from 'react-hook-form/dist/index.ie11'
import { useStore } from '@/lib/store'
import useNavigation from '@/lib/useNavigation'
import { Input } from '@/components/core'
import hospitals from '@/lib/hospitals'

export const SectionFormMeta = () => {
    const { register } = useFormContext()
    const store = useStore()
    const { hospital, option } = useNavigation()
    const formType = option === 'patient' ? 'PAT' : '3RD'
    const { slug } = hospitals[hospital]

    return (
        <>
            <Input type="hidden" name="CLNT" value={slug} ref={register} />
            <Input type="hidden" name="FTYPE" value={formType} ref={register} />
            <Input
                type="hidden"
                name="TRKNUM"
                value={
                    Array.isArray(store.state.trackingNumbers)
                        ? store.state.trackingNumbers[0].TrackingNumberID
                        : ''
                }
                ref={register}
            />
        </>
    )
}

export default SectionFormMeta
