import { Box, Flex, Input, Select } from '@/components/core'
import { months, range } from '@/lib/helpers'

export const DatePicker = ({
    className,
    monthFieldName,
    dayFieldName,
    yearFieldName,
    ...props
}) => (
    <Flex className={className}>
        <Select name={monthFieldName} className="mr-2">
            <option key="month" defaultValue disabled>
                Month
            </option>
            {months.map(month => (
                <option key={`mth-${month.number}`} value={month.number}>
                    {month.name}
                </option>
            ))}
        </Select>
        <Select name={dayFieldName} className="mr-2">
            <option defaultValue disabled>
                Day
            </option>
            {range(1, 31).map(day => (
                <option key={`day-${day}`} value={day}>
                    {day}
                </option>
            ))}
        </Select>
        <Input
            name={yearFieldName}
            type="number"
            placeholder="Year"
            className=""
        />
    </Flex>
)

export default DatePicker
