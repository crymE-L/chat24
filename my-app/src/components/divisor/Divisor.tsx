import {
    Flex,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from '@chakra-ui/react'
import { Hydrogen } from '../stats/Hydrogen'
import { Energy } from '../stats/Energy'
import { Other } from '../stats/Other'

const data = {
    messageId: 3,
    deviceId: 'Raspberry Pi Web Client',
    temperature: 20.48,
    humidity: 70.21,
    pressure: 299.01,
    gasRate: 10.43,
    flowRate: 20.43
}

export const Divisor = () => (
        <Flex minW="100%" justify="center">
            <Tabs minW="80%" isFitted>
                <TabList>
                    <Tab fontWeight="bold" color="#3FB487">Hydrogen</Tab>
                    <Tab fontWeight="bold" color="#3FB487">Energy</Tab>
                    <Tab fontWeight="bold" color="#3FB487">Other</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Hydrogen />
                    </TabPanel>
                    <TabPanel>
                        <Energy />
                    </TabPanel>
                    <TabPanel>
                        <Other temperature={data.temperature} humidity={data.humidity} pressure={data.pressure} gasRate={data.gasRate} flowRate={data.flowRate}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
);