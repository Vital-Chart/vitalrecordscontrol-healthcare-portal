import cx from 'classnames'
import { Heading } from '@/components/core'

export const PageHeading = ({ className, children }) => (
    <Heading className={cx('py-4 border-b-2 border-gray-light', className)}>
        {children}
    </Heading>
)

export default PageHeading
