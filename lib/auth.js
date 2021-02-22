import React, { useEffect, createContext, useContext, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '@/lib/store'

export const AuthContext = createContext()

// Hook for child components to use
export const useAuth = () => {
    return useContext(AuthContext)
}

// Provider component that wraps your app and makes the store object
// available to any child component that calls useStore()
export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const store = useStore()

    if (Array.isArray(store.state.trackingNumber)) {
        console.log('Tracking exists.')
    } else {
        console.log('No tracking!')
        // router.push('/pih')
    }

    // Persist any state we want to keep
    // useEffect(() => {
    //     window.localStorage['vrc_healthcare_portal'] = JSON.stringify({
    //         trackingNumbers: state.trackingNumbers,
    //         form: state.form,
    //         uploadedFiles: state.uploadedFiles,
    //         signature: state.signature,
    //         expires: getExpires(),
    //     })
    // }, [state])

    const value = {}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// export const hasAccess = WrappedComponent => {
//     const Wrapper = props => {
//         const router = useRouter()
//         const store = useStore()

//         if (Array.isArray(store.state.trackingNumber)) {
//             console.log('Tracking exists.')
//         } else {
//             router.push('/pih')
//         }
//         return <WrappedComponent {...props} />
//     }

//     return Wrapper
// }

export const useHospital = () => {
    return router.pathname.split('/')[1]
}

export const useRoute = () => {
    const store = useStore()
    const router = useRouter()
    const trackingNumberExists = store.state.trackingNumbers !== -1
    // {TODO: Re-enable access checks}
    return {
        hospital: router.pathname.split('/')[1],
        option: router.pathname.split('/')[2],
        canUploadAuth: true,
        canSubmit: true,
        // canUploadAuth: trackingNumberExists,
        // canSubmit: trackingNumberExists && store.state.uploadedFiles.length > 0,
    }
}

export default hasAccess
