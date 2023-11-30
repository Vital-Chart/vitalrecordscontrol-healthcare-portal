import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Link, Text, Button, Flex, Heading } from '@/components/core'
import { PageHeading, Info, LandingIntro } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const Hospital = () => {
    const { hospital, getLandingPage } = useNavigation()

    return(
        <Layout>
        <LandingIntro>
            <Heading
                as="h1"
                variant="h1"
                className="pt-4 pb-6 mb-6 text-white border-b-2 border-white"
            >
                This site is no longer available
            </Heading>
            <Heading
                as="h1"
                variant="h1"
                className="pt-4 pb-6 mb-6 text-white border-b-2 border-white"
            >
                This site is no longer available
            </Heading>
            <Heading
                as="h1"
                variant="h1"
                className="pt-4 pb-6 mb-6 text-white border-b-2 border-white"
            >
                This site is no longer available
            </Heading>
        </LandingIntro>
        </Layout>

    )
}

export default Hospital
