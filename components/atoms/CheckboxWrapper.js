import cx from 'classnames'
import { Flex } from '@/components/core'

export const CheckboxWrapper = ({ children, className }) => (
    <Flex className={cx('flex-col items-start pl-4', className)}>
        {children}
    </Flex>
)

export default CheckboxWrapper
