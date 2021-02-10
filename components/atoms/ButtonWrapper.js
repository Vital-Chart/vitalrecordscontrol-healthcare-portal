import cx from 'classnames'
import { Flex } from '@/components/core'

export const ButtonWrapper = ({ className, children }) => (
    <Flex className={cx('py-8', className)}>{children}</Flex>
)

export default ButtonWrapper
