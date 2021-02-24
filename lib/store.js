import React, { useEffect, createContext, useContext, useReducer } from 'react'
import { uniqueArrayValues } from '@/lib/helpers'

export const StoreContext = createContext()

// Hook for child components to use
export const useStore = () => {
    return useContext(StoreContext)
}

const ONE_MINUTE = 60000
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24

// Get an expiration timestamp
const getExpires = () => {
    return new Date(new Date().getTime() + ONE_DAY).getTime()
}

// Initial state values
const initialState = {
    trackingNumbers: -1,
    form: {},
    authForm: null,
    newFiles: [],
    uploadedFiles: [],
    signature: null,
    expires: getExpires(),
    success: false,
}

// Persisted state values from localStorage
const persistedState =
    typeof window !== 'undefined' &&
    JSON.parse(window.localStorage['vrc_healthcare_portal'] || '{}')

// Store reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TRACKING_NUMBER': {
            return {
                ...state,
                trackingNumbers: action.value,
                form: { ...state.form, TRKNUM: action.value[0] },
            }
        }
        case 'UPDATE_FORM': {
            return {
                ...state,
                form: { ...state.form, ...action.value },
                authForm: null,
                success: false,
            }
        }
        case 'UPDATE_AUTH_FORM': {
            return {
                ...state,
                authForm: {
                    url: action.value,
                    expires: getExpires(),
                },
            }
        }
        case 'ADD_FILES': {
            return {
                ...state,
                newFiles: uniqueArrayValues(
                    [...state.newFiles, ...action.value],
                    'name'
                ),
            }
        }
        case 'REMOVE_FILE': {
            return {
                ...state,
                newFiles: state.newFiles.filter(
                    file => file.name !== action.value
                ),
                uploadedFiles: state.uploadedFiles.filter(
                    file => file.name !== action.value
                ),
            }
        }
        case 'UPDATE_UPLOADED_FILES': {
            return {
                ...state,
                newFiles: [],
                uploadedFiles: uniqueArrayValues(
                    [
                        ...state.uploadedFiles,
                        ...state.newFiles.map(file => ({
                            name: file.name,
                            size: file.size,
                        })),
                    ],
                    'name'
                ),
            }
        }
        case 'UPDATE_SIGNATURE': {
            return {
                ...state,
                signature: action.value,
            }
        }
        case 'UPDATE_SUCCESS': {
            return {
                ...initialState,
                success: {
                    hospital: action.value,
                    facilities: state.form.FI_CB,
                    trackingNumbers: state.trackingNumbers,
                },
            }
        }
        case 'RESET_REQUEST': {
            return initialState
        }
    }

    return state
}

// Helper function to log state changes
const logger = reducer => {
    const reducerWithLogger = (state, action) => {
        if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
            console.log()
            console.log(
                '%cPrevious State:',
                'color: #9E9E9E; font-weight: 700;',
                state
            )
            console.log(
                '%cAction:',
                'color: #00A7F7; font-weight: 700;',
                action
            )
            console.log(
                '%cNext State:',
                'color: #47B04B; font-weight: 700;',
                reducer(state, action)
            )
        }

        return reducer(state, action)
    }

    return reducerWithLogger
}

// Provider component that wraps your app and makes the store object
// available to any child component that calls useStore()
export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(logger(reducer), {
        ...initialState,
        ...(persistedState?.expires > new Date().getTime()
            ? persistedState
            : {}),
    })
    const value = { state, dispatch }

    // Persist any state we want to keep
    useEffect(() => {
        window.localStorage['vrc_healthcare_portal'] = JSON.stringify({
            trackingNumbers: state.trackingNumbers,
            form: state.form,
            authForm: state.authForm,
            uploadedFiles: state.uploadedFiles,
            signature: state.signature,
            expires: getExpires(),
            success: state.success,
        })
    }, [state])

    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    )
}

// Consumer component for our StoreContext
export const StoreConsumer = StoreContext.Consumer

// HOC to supply component with useStore
export const withStore = WrappedComponent => {
    const Wrapper = props => {
        const store = useStore()
        return <WrappedComponent store={store} {...props} />
    }

    return Wrapper
}
