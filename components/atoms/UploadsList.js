import { useState, useEffect } from 'react'
import cx from 'classnames'
import { Box, Flex, Text, Link } from '@/components/core'
import { ScreenReader } from '@/components/general'
import { useStore } from '@/lib/store'
import { getUploadedFile, deleteUploadedFile } from '@/lib/api'
import IconClose from '@/icons/icon-close.svg'

export const UploadsList = ({
    className,
    isEditable,
    setServerErrors,
    ...props
}) => {
    const store = useStore()
    const { uploadedFiles } = store.state

    const [isFetching, setIsFetching] = useState(false)

    const getUploadUri = async fileName => {
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
                errorInformation.map(error => {
                    if (error.errorNumber === 100001) {
                        throw new Error(error)
                    }
                })
                setServerErrors(
                    errorInformation.map(error => error.errorNumber)
                )
            } else {
                setServerErrors([])
                return FormURI
            }
        } catch (error) {
            // General server error
            console.error(error)
            setServerErrors([100000])
            setIsFetching(false)
        }
    }

    // console.log('Uploads', uploadedFiles)

    useEffect(() => {
        uploadedFiles.map(async file => {
            if (!file.uri) {
                file.uri = await getUploadUri(file.name)
            }
        })
    }, [uploadedFiles])

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
                errorInformation.map(error => {
                    if (error.errorNumber === 100001) {
                        throw new Error(error)
                    }
                })
                setServerErrors(
                    errorInformation.map(error => error.errorNumber)
                )
                console.error({ errorInformation })
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
                {isEditable && <Box className="w-10 py-2 px-4"></Box>}
                <Box className="flex-1 py-2 px-4">
                    <Text className="uppercase text-sm font-bold">
                        Uploaded Files
                    </Text>
                </Box>

                <Box className="w-32 py-2 px-4">
                    <Text className="uppercase text-sm text-center font-bold">
                        View
                    </Text>
                </Box>
            </Flex>

            {store.state.uploadedFiles.length ? (
                store.state.uploadedFiles.map(file => (
                    <Flex key={file.name}>
                        {isEditable && (
                            <Flex className="items-center justify-center w-10 p-2">
                                <Box
                                    as="button"
                                    onClick={() => handleDeleteFile(file.name)}
                                    className="inline-flex items-center text-red cursor-pointer"
                                >
                                    <IconClose className="h-4 w-4" />

                                    <ScreenReader>Close</ScreenReader>
                                </Box>
                            </Flex>
                        )}
                        <Flex className="flex-1 items-center py-2 px-4">
                            <Text>
                                {file.name}{' '}
                                <Text as="span" className="text-gray">
                                    {file.size >= 1000000
                                        ? `(${(file.size / 1000000).toFixed(
                                              1
                                          )} MB)`
                                        : `(${Math.round(
                                              file.size / 1000
                                          )} KB)`}
                                </Text>
                            </Text>
                        </Flex>

                        <Box className="w-32 py-2 px-4 text-center">
                            {file.uri ? (
                                <Link
                                    className="underline text-sm text-blue hover:text-black transition-colors"
                                    href={file.uri}
                                    target="_blank"
                                >
                                    View File
                                </Link>
                            ) : (
                                <Text as="span" className="text-sm">
                                    Uploading...
                                </Text>
                            )}
                        </Box>
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
