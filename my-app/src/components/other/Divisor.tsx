import {
    Flex,
    Container,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from '@chakra-ui/react'
import { Hydrogen } from './Hydrogen'

export default function Divisor() {
    return (
        <Container w='100%'>
            <Tabs isFitted variant='enclosed'>
                <TabList>
                    <Tab>Hydrogen</Tab>
                    <Tab>Energy</Tab>
                    <Tab>Other</Tab>
                </TabList>
            <TabPanels>
                <TabPanel>
                    <Hydrogen />
                </TabPanel>
                <TabPanel>
                    <p>Energy!</p>
                </TabPanel>
                <TabPanel>
                    <p>Other!</p>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Container>
    );
};

export { Divisor };