import cx from 'classnames'
import { Box } from '@/components/core'

export const Container = ({ className, ...props }) => (
    <Box
        className={cx(
            'w-full max-w-screen-xl mx-auto my-0 px-6 sm:px-8',
            className
        )}
        {...props}
    />
)

Container.defaultProps = {
    className: '',
}

export default Container
