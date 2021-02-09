import cx from 'classnames'
import { Heading } from '@/components/core'

export const SectionHeading = ({ className, children }) => (
    <Heading variant="h3" className={cx('mb-4', className)}>
        {children}
    </Heading>
)

export default SectionHeading
