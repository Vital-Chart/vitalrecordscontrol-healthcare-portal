import { withStore } from '@/lib/store'
import { LayoutReview } from '@/components/layouts'

const PIHSendToReview = ({ store }) => {
    return <LayoutReview />
}

export default withStore(PIHSendToReview)
