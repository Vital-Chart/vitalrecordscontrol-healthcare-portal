import cx from 'classnames'
import { Flex } from '@/components/core'

export const CheckboxWrapper = ({ children, className }) => (
    <Flex className={cx('flex-col items-start pl-4 space-y-2', className)}>
        {children}
    </Flex>
)

export default CheckboxWrapper
