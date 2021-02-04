import cx from 'classnames'
import { Box, Flex } from '@/components/core'
import IconAlert from '@/icons/icon-alert.svg'

export const Alert = ({ className }) => (
    <Box
        className={cx(
            'rounded-md bg-secondary-lightest my-2 p-4 border-l-4 border-secondary',
            className
        )}
    >
        <Flex>
            <Box className="flex-shrink-0">
                <IconAlert className="h-5 w-5 text-secondary-dark" />
            </Box>
            <Box className="ml-3">
                <p className="text-sm text-secondary-darkest">
                    <span className="font-bold">
                        Once you hit "Continue" below, you cannot change which
                        facilities you are requesting from.
                    </span>{' '}
                    Please double-check to make sure you select the correct
                    facility or facilities.
                </p>
            </Box>
        </Flex>
    </Box>
)

export default Alert
