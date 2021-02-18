import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { withStore } from '@/lib/store'
import { LayoutUpload } from '@/components/layouts'
import { Box, Text } from '@/components/core'

const PIHPatientUpload = ({ store }) => {
    return (
        <LayoutUpload>
            <Box className="pb-8 border-b border-gray-light">
                <Text className="pb-4">
                    Your request has been saved and assigned tracking number(s):{' '}
                    <Text as="span" className="font-bold">
                        81-196019
                    </Text>
                    .
                </Text>
                <Text className="pb-4">
                    Please contact the following facility/facilities if you have
                    any questions during this process:
                </Text>
                <Text className="pb-4">
                    <Text as="span" className="font-bold">
                        81-196019
                    </Text>
                    : Palomar Health Medical Records - (760) 480-7911
                </Text>
            </Box>
        </LayoutUpload>
    )
}

export default withStore(PIHPatientUpload)
