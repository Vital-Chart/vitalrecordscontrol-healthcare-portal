import useNavigation from '@/lib/useNavigation'
import { Text, Heading } from '@/components/core'
import { LandingIntroD } from '@/components/atoms'
import { Layout } from '@/components/general'

function Hospital() {
    const { getLandingPage, hospital } = useNavigation()

    return (
        <Layout>
            <LandingIntroD>
                <Heading
                    as="h1"
                    variant="h1"
                    className="pt-4 pb-6 mb-6 text-white border-b-2 border-white"
                >
                    This site has been disabled!
                </Heading>
                <Text className="text-lg sm:text-xl text-white">
                    Please contact Palomar Health directly for your records.
                </Text>
            </LandingIntroD>
        </Layout>
    )
}

export default Hospital
