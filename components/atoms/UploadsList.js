import { useState } from 'react'
import cx from 'classnames'
import { Box, Flex, Text, Button } from '@/components/core'
import { useStore } from '@/lib/store'
import { getUploadedFile, deleteUploadedFile } from '@/lib/api'
import IconLoading from '@/icons/icon-loading.svg'

export const UploadsList = ({
    className,
    isEditable,
    setServerErrors,
    ...props
}) => {
    const store = useStore()

    const [isFetching, setIsFetching] = useState(false)

    const handleViewUpload = async fileName => {
        try {
            const {
                FormURI,
                inError,
                errorInformation,
            } = await getUploadedFile(
                store.state.trackingNumbers[0].TrackingNumberID,
                fileName,
                store.state.form
            )

            if (inError) {
                setServerErrors(
                    errorInformation.map(error => error.errorNumber)
                )
            } else {
                setServerErrors([])
                window.open(FormURI, '_blank')
            }
        } catch (error) {
            // General server error
            console.error(error)
            setServerErrors([100000])
            setIsFetching(false)
        }
    }

    const handleDeleteFile = async fileName => {
        setServerErrors([])
        setIsFetching(true)

        try {
            const { errorInformation, inError } = await deleteUploadedFile(
                store.state.trackingNumbers[0].TrackingNumberID,
                fileName,
                store.state.form
            )

            if (inError) {
                setServerErrors(
                    errorInformation.map(error => error.errorNumber)
                )
                console.log({ errorInformation })
                setIsFetching(false)
            } else {
                store.dispatch({
                    type: 'REMOVE_FILE',
                    value: fileName,
                })
                setIsFetching(false)
            }
        } catch (error) {
            // General server error
            setServerErrors([100000])
            setIsFetching(false)
        }
    }

    return (
        <Box className={cx('divide-y divide-gray-light', className)} {...props}>
            <Flex className="bg-gray-light">
                <Box className="flex-1 py-2 px-4">
                    <Text className="uppercase text-sm font-bold">
                        File Name
                    </Text>
                </Box>

                <Box className="w-32 py-2 px-4">
                    <Text className="uppercase text-sm font-bold">Size</Text>
                </Box>

                {isEditable && <Box className="w-28 py-2 px-4" />}
            </Flex>

            {store.state.uploadedFiles.length ? (
                store.state.uploadedFiles.map(file => (
                    <Flex key={file.name}>
                        <Box className="flex-1 py-2 px-4">
                            <Button
                                className="underline text-blue hover:text-black transition-colors"
                                onClick={() => handleViewUpload(file.name)}
                            >
                                {file.name}
                            </Button>
                            {/* <Text>{file.name}</Text> */}
                        </Box>

                        <Box className="w-32 py-2 px-4">
                            <Text>
                                {file.size >= 1000000
                                    ? `${(file.size / 1000000).toFixed(1)} MB`
                                    : `${Math.round(file.size / 1000)} KB`}
                            </Text>
                        </Box>

                        {isEditable && (
                            <Box className="w-28 py-2 px-4 text-right">
                                <Box
                                    as="button"
                                    onClick={() => handleDeleteFile(file.name)}
                                >
                                    {isFetching ? (
                                        <IconLoading className="w-6 text-gray-400 animate-spin" />
                                    ) : (
                                        <>Remove</>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Flex>
                ))
            ) : (
                <Box className="py-2 px-4">
                    <Text className="text-sm">
                        No uploads associated with this request. Please add
                        authorization forms before releasing for processing.
                    </Text>
                </Box>
            )}
        </Box>
    )
}

UploadsList.defaultProps = {
    isEditable: true,
}

export default UploadsList
