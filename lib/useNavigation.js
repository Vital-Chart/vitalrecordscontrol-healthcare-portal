import { useRouter } from 'next/router'
import { useStore } from '@/lib/store'

const stepList = ['form', 'upload', 'review']

const useNavigation = () => {
    const { pathname } = useRouter()
    const store = useStore()
    let [, hospital, option, step] = pathname.split('/')

    const isSuccessPage = hospital === 'success' ? true : false
    if (isSuccessPage) hospital = store.state.success.hospital

    const isStepPage = !!(hospital && option && step)

    const hasUploadAccess = store.state.trackingNumbers !== -1
    const hasSubmitAccess =
        hasUploadAccess && store.state.uploadedFiles.length > 0

    function getLandingPage() {
        if (!hospital) return null

        return `/${hospital}`
    }

    function getInstructionPage() {
        if (!hospital || !option || isSuccessPage) return null

        return `/${hospital}/${option}`
    }

    function getStepPage(nextStep = null) {
        if (!stepList.includes(nextStep))
            throw new Error(`\`${nextStep}\` isn't a valid step.`)

        if (!hospital || !option) return null

        return `/${hospital}/${option}/${nextStep}`
    }

    function getContactPage() {
        if (!hospital) return null

        return `/${hospital}/contact`
    }

    function getSuccessPage() {
        return `/success`
    }

    // console.log({
    //     pathname,
    //     hospital,
    //     option,
    //     step,
    //     getLandingPage,
    //     getInstructionPage,
    //     getStepPage,
    //     getContactPage,
    //     getSuccessPage,
    //     hasUploadAccess,
    //     hasSubmitAccess,
    //     isStepPage,
    //     isSuccessPage,
    // })

    return {
        pathname,
        hospital,
        option,
        step,
        getLandingPage,
        getInstructionPage,
        getStepPage,
        getContactPage,
        getSuccessPage,
        goToLandingPage: () => router.push(getLandingPage()),
        goToInstructionPage: () => router.push(getInstructionPage()),
        goToStep: step => router.push(getStepPage(step)),
        goToContactPage: () => router.push(getContactPage()),
        goToSuccessPage: () => router.push(getSuccessPage()),
        goBack: () => router.back(),
        hasUploadAccess,
        hasSubmitAccess,
        isStepPage,
        isSuccessPage,
    }
}

export default useNavigation
