import { useRouter } from 'next/router'
import { useStore } from '@/lib/store'

const stepList = ['form', 'upload', 'review']

const useNavigation = () => {
    const router = useRouter()
    const store = useStore()
    const [, hospital, option, step] = router.pathname.split('/')

    const hasUploadAccess = store.state.trackingNumbers !== -1
    const hasSubmitAccess =
        hasUploadAccess && store.state.uploadedFiles.length > 0

    function getLandingPage() {
        if (!hospital) return null
        return `/${hospital}`
    }

    function getInstructionPage() {
        if (!hospital || !option) return null
        return `/${hospital}/${option}`
    }

    function getStep(nextStep = null) {
        if (!stepList.includes(nextStep))
            throw new Error(`\`${nextStep}\` isn't a valid step.`)

        if (!hospital || !option) return null

        return `/${hospital}/${option}/${nextStep}`
    }

    function getContactPage() {
        if (!hospital) return null
        return `/${hospital}/contact`
    }

    // console.log({
    //     hospital,
    //     option,
    //     step,
    //     getLandingPage,
    //     getInstructionPage,
    //     getStep,
    //     getContactPage,
    //     hasUploadAccess,
    //     hasSubmitAccess,
    // })

    return {
        pathname: router.pathname,
        hospital,
        option,
        step,
        getLandingPage,
        getInstructionPage,
        getStep,
        getContactPage,
        goToLandingPage: () => router.push(getLandingPage()),
        goToInstructionPage: () => router.push(getInstructionPage()),
        goToStep: step => router.push(getStep(step)),
        goToContactPage: () => router.push(getContactPage()),
        goBack: () => router.back(),
        hasUploadAccess,
        hasSubmitAccess,
    }
}

export default useNavigation
