import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '@/lib/store'

const stepList = ['form', 'upload', 'review']

const useNavigation = () => {
    const router = useRouter()
    const store = useStore()
    const { pathname, asPath } = router
    let [, pathnameStart] = pathname.split('/')
    let [, hospital, option, step] = asPath.split('/')

    // TODO: Is there a better way to handle this?
    if (hospital.includes('#')) {
        hospital = hospital.split('#', 1).toString()
    }

    const is404Page = pathnameStart === '404' ? true : false
    if (is404Page) hospital = null

    const isSuccessPage = pathnameStart === 'success' ? true : false
    if (isSuccessPage) hospital = store.state.success.hospital

    const isLandingPage = !!(
        hospital &&
        !option &&
        !step &&
        !isSuccessPage &&
        !is404Page
    )

    const isStepPage = !!(hospital && option && step)

    const hasUploadAccess = store.state.trackingNumbers !== ''
    const hasSubmitAccess =
        hasUploadAccess && store.state.uploadedFiles.length > 0

    useEffect(() => {
        if (isStepPage && store.state.requestId !== `${hospital}:${option}`) {
            store.dispatch({
                type: 'UPDATE_REQUEST_ID',
                value: `${hospital}:${option}`,
            })
        }
    }, [isStepPage, hospital, option])

    function getStartPage() {
        if (!hospital) return null

        return `/${hospital}/start`
    }

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

    return {
        pathname,
        asPath,
        hospital,
        option,
        step,
        getStartPage,
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
        goTo: path => router.push(path),
        goBack: () => router.back(),
        hasUploadAccess,
        hasSubmitAccess,
        isStepPage,
        isLandingPage,
        isSuccessPage,
        is404Page,
    }
}

export default useNavigation
