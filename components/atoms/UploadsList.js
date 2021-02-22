import cx from 'classnames'
import { Box, Flex, Text } from '@/components/core'
import { useStore } from '@/lib/store'

export const UploadsList = ({ className, isEditable, ...props }) => {
    const store = useStore()

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

            {store.state.uploadedFiles.length || store.state.newFiles.length ? (
                [...store.state.uploadedFiles, ...store.state.newFiles].map(
                    file => (
                        <Flex key={file.name}>
                            <Box className="flex-1 py-2 px-4">
                                <Text>{file.name}</Text>
                            </Box>

                            <Box className="w-32 py-2 px-4">
                                <Text>
                                    {file.size >= 1000000
                                        ? `${(file.size / 1000000).toFixed(
                                              1
                                          )} MB`
                                        : `${Math.round(file.size / 1000)} KB`}
                                </Text>
                            </Box>

                            {isEditable && (
                                <Box className="w-28 py-2 px-4 text-right">
                                    <Box
                                        as="button"
                                        onClick={() => {
                                            store.dispatch({
                                                type: 'REMOVE_FILE',
                                                value: file.name,
                                            })
                                        }}
                                    >
                                        Remove
                                    </Box>
                                </Box>
                            )}
                        </Flex>
                    )
                )
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
