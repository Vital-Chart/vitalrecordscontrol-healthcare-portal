import { useForm, Controller } from 'react-hook-form'
import MicroModal from 'react-micro-modal'
import DatePicker from 'react-datepicker'
import { withStore } from '@/lib/store'
import { Layout, Container, ScreenReader } from '@/components/general'
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
    Link,
} from '@/components/core'
import {
    FormWrapper,
    FormSection,
    SectionHeading,
    PageHeading,
    CheckboxWrapper,
    Alert,
    Info,
    ErrorMessage,
    ButtonWrapper,
    Stepper,
} from '@/components/atoms'

const Custom404 = () => (
    <Layout>
        <Container>
            <Box className="max-w-screen-md mx-auto space-y-8 text-center">
                <PageHeading>Page Not Found</PageHeading>

                <Text className="pb-4 leading-relaxed">
                    The page you requested was not found. Please return the
                    landing page to make another selection.
                </Text>

                <Button
                    as={Link}
                    href="/pih"
                    variant="filled"
                    className="inline-block"
                >
                    Return to the Landing Page
                </Button>
            </Box>
        </Container>
    </Layout>
)

export default Custom404
