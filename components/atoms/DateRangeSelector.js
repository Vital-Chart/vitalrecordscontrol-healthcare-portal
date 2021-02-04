import cx from 'classnames'
import { Box, Flex, Label } from '@/components/core'
import { DatePicker } from '@/components/atoms'
import IconAlert from '@/icons/icon-alert.svg'

export const DateRangeSelector = ({ className }) => (
    <Box className={className}>
        <Label className="block mb-1">Service Start:</Label>
        <DatePicker />
        <Label className="block mt-2 mb-1">Service End:</Label>
        <DatePicker />
    </Box>
)

export default DateRangeSelector
