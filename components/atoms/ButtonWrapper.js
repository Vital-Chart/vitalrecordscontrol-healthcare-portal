import cx from 'classnames'
import { Flex } from '@/components/core'

export const ButtonWrapper = ({ className, children }) => (
    <Flex
        className={cx(
            'flex-wrap items-start justify-center pt-6 border-t-2 border-gray-light',
            className
        )}
    >
        {children}
    </Flex>
)

export default ButtonWrapper
