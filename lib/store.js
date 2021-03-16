import React, {
    useEffect,
    useState,
    createContext,
    useContext,
    useReducer,
} from 'react'
import { useRouter } from 'next/router'
import { uniqueArrayValues } from '@/lib/helpers'

export const StoreContext = createContext()

// Hook for child components to use
export const useStore = () => {
    return useContext(StoreContext)
}

const ONE_MINUTE = 60e3
// const ONE_HOUR = ONE_MINUTE * 60
// const ONE_DAY = ONE_HOUR * 24

// Get an expiration timestamp
const getExpires = (minutes = null) => {
    const time = minutes || ONE_MINUTE * 10
    return new Date(new Date().getTime() + time).getTime()
}

// Initial state values
const initialState = {
    trackingNumbers: '',
    requestId: null,
    form: {},
    authForm: null,
    uploadedFiles: [],
    signature: null,
    expires: getExpires(),
    success: false,
    redirect: null,
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
                form: {
                    ...state.form,
                    TRKNUM: action.value[0].TrackingNumberID,
                },
            }
        }
        case 'UPDATE_REQUEST_ID': {
            return {
                ...initialState,
                requestId: action.value,
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
                    expires: getExpires(ONE_MINUTE * 30),
                },
            }
        }
        case 'ADD_FILES': {
            return {
                ...state,
                uploadedFiles: [...state.uploadedFiles, action.value],
            }
        }
        case 'REMOVE_FILE': {
            return {
                ...state,
                uploadedFiles: state.uploadedFiles.filter(
                    file => file.name !== action.value
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
                    facilities: Array.isArray(state.form.FI_CB)
                        ? state.form.FI_CB
                        : [state.form.FI_CB],
                    trackingNumbers: state.trackingNumbers,
                },
            }
        }
        case 'RESET_REQUEST': {
            return { ...initialState, redirect: action?.redirect }
        }

        case 'CLEAR_REDIRECT': {
            return {
                ...state,
                redirect: null,
            }
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
    const router = useRouter()
    const [state, dispatch] = useReducer(logger(reducer), {
        ...initialState,
        ...(persistedState?.expires > new Date().getTime()
            ? persistedState
            : {}),
    })
    const [isRedirect, setIsRedirect] = useState(null)
    const value = { state, dispatch }

    // Persist any state we want to keep
    useEffect(() => {
        if (state.redirect) {
            setIsRedirect(state.redirect)

            dispatch({
                type: 'CLEAR_REDIRECT',
            })
        }

        if (isRedirect) {
            setIsRedirect(null)
            router.push(isRedirect)
        }

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
