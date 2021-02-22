import { useRouter } from 'next/router'
import { useStore } from '@/lib/store'

export const useRoute = () => {
    const store = useStore()
    const router = useRouter()
    const trackingNumberExists = store.state.trackingNumbers !== -1
    // {TODO: Re-enable access checks}
    return {
        hospital: router.pathname.split('/')[1],
        option: router.pathname.split('/')[2],
        canUploadAuth: true,
        canSubmit: true,
        // canUploadAuth: trackingNumberExists,
        // canSubmit: trackingNumberExists && store.state.uploadedFiles.length > 0,
    }
}
