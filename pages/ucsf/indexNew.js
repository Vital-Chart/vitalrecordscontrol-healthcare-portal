import useNavigation from '@/lib/useNavigation'
import hospitals from '@/lib/hospitals'
import { Box, Link, Text, Button, Flex, Heading } from '@/components/core'
import { PageHeading, Info, LandingIntro } from '@/components/atoms'
import { Layout, Container } from '@/components/general'

const ChartChoice = () => {
    const { getLandingPage, hospital } = useNavigation()

    return (
        <Layout>

            <Container id='recordChoice'>
                <Box className="w-full max-w-screen-md">
                    <Text className="text-2xl text-center">
                    How to Obtain Medical Records and Test Results
                    </Text>

                    <Box className="mt-8">
                        <Text className="text-lg">
                        <p>At UCSF Health and our affiliated practices, we believe in information transparency.
                        We want you (and, when appropriate, your health care proxies) to see your health
                        information as soon as it’s available. We believe this improves communication and builds
                        better relationships.</p>
                        </Text>
                    </Box> 

                    <Box className="mt-8">
                        <Text className="text-xl font-bold">
                        <p>There are two ways to obtain your UCSF medical records:</p>
                        </Text>
                    
                        <Text className="text-xl">
                        Through MyChart at: <a class='text-blue' href='https://www.ucsfhealth.org/mychart'>https://www.ucsfhealth.org/mychart</a>
                        </Text>
                    
                        <br />
                        <Text className="text-xl">
                        Or through Health Information Management Services at:<br />
                        <a  class='text-blue' href='https://www.ucsfhealth.org/medical-records'>https://www.ucsfhealth.org/medical-records</a>
                        </Text>
                    </Box>
                    
                    <Box className="mt-8">
                        <Text className="text-2xl font-bold">
                        MyChart<br /><br />
                        </Text>
                        <Text className="text-2xl text-gray">
                        What is Available in MyChart<br />
                        </Text>
                        Most clinical notes, test results including laboratory, radiology, cardiology and
                         microbiology results are available and visible in MyChart without your making a
                         request. This allows you to prepare for your next health care visit by reviewing
                         your health care provider's recommendations and noting any questions you want to ask.
                        
                        <br /><br />To obtain your record via MyChart <a class='text-blue' href='https://www.ucsfhealth.org/mychart'>click here https://www.ucsfhealth.org/mychart</a>
                    
                    </Box>

                    <Box className="mt-8">
                        <Text className="text-2xl font-bold">
                        Health Information Management Services<br /><br />
                        </Text>
                     
                    To obtain your complete medical record, test results or clinical notes that are not
                     available in MyChart, you can request from our Medical Records department. Using this
                     option will require completion of a Health Information Authorization Form
                     Processing fees will be charged and you will be notified of the charges prior to
                     production of the record. Copies from paper chart will be charged at a rate of 25 cents
                     per page.<br /><br />
                    </Box>
 
                    <Box id='testLink'>
                    <Text className="text-xl font-bold">
                    Mail or fax all written requests to:<br />
                    </Text>
                    Health Information Management Services<br />
                    UCSF Health<br />
                    400 Parnassus Ave., Room A88<br />
                    San Francisco, CA 94143-0308<br />
                    Fax 415-353-4839<br /><br />
                    </Box>
                </Box>
            </Container>


 

</Layout>
    )
}

export default ChartChoice
