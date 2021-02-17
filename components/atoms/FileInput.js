import { useCallback, useEffect } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import {
    Box,
    Text,
    Checkbox,
    Select,
    Radio,
    Label,
    Input,
    Flex,
    Button,
} from '@/components/core'
import IconUpload from '@/icons/icon-upload.svg'

export const FileInput = props => {
    const { name, label = name } = props
    // const { register, unregister, setValue, watch } = useFormContext()
    // const files = watch(name)
    const onDrop = useCallback()
    // droppedFiles => {
    //     setValue(name, droppedFiles, { shouldValidate: true })
    // },
    // [setValue, name]
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: props.accept,
    })
    // useEffect(() => {
    //     register(name)
    //     return () => {
    //         unregister(name)
    //     }
    // }, [register, unregister, name])
    return (
        <>
            <Label
                className="block text-gray-700 text-sm font-bold mb-2 capitalize"
                htmlFor={name}
            >
                {label}
            </Label>
            <Box {...getRootProps()}>
                <input
                    {...props}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={name}
                    {...getInputProps()}
                />
                <Box
                    className={
                        'w-full p-8 bg-gray-lightest border border-gray-light ' +
                        (isDragActive ? 'bg-gray-400' : 'bg-gray-200')
                    }
                >
                    <Flex className="items-center justify-center text-center text-gray-dark my-2">
                        <IconUpload className="w-12 h-auto mr-4" />
                        <Text className="font-bold">Drop the files here.</Text>
                    </Flex>
                    {/* Optionally you may display a preview of the file(s) */}
                    {/* {!!files?.length && (
                        <div className="grid gap-1 grid-cols-4 mt-2">
                            {files.map(file => {
                                return (
                                    <div key={file.name}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )} */}
                </Box>
            </Box>
        </>
    )
}

export default FileInput
