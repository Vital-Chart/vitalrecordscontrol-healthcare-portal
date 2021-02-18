import { withStore } from '@/lib/store'
import { LayoutReview } from '@/components/layouts'

const PIHPatientReview = ({ store }) => {
    return <LayoutReview />
}

export default withStore(PIHPatientReview)
