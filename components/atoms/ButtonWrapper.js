import cx from 'classnames'
import { Flex } from '@/components/core'

export const ButtonWrapper = ({ className, children }) => (
    <Flex
        className={cx('py-8 space-x-4 border-t-2 border-gray-light', className)}
    >
        {children}
    </Flex>
)

export default ButtonWrapper
