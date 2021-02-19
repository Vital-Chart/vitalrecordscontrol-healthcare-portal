import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { withStore } from '@/lib/store'
import { LayoutReview } from '@/components/layouts'

const PIHPatientReview = ({ store }) => {
    // TODO: Move this to the layout component so it's reused on all review pages
    const router = useRouter()

    useEffect(() => {
        // Get hospital name from first directory after 'pages' root
        const hospital = router.pathname.split('/')[1]

        // Redirect to hospital landing page if no tracking number exists
        if (!store.state.form.TRKNUM && !store.state.form.uploadedFiles) {
            router.push(`/${hospital}`)
        }
    }, [])

    return <LayoutReview />
}

export default withStore(PIHPatientReview)
