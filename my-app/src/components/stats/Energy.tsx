import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Flex,
  } from '@chakra-ui/react'

  export const Energy = () => (
    <Flex 
        flexDirection={{ base: 'column', md: 'row' }} 
        minW="100%" 
        justifyContent={{ base: 'center', md: 'space-between' }}
        pt="8"
    >        
        <Flex 
            minW={{ base: '100%', md: '33%', lg: '33%' }} 
            justify="space-between" 
            mb={{base: '2', md: '0'}}
        >
            <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345</StatNumber>
                <StatHelpText>
                <StatArrow type='increase' />
                    23.36%
                </StatHelpText>
            </Stat>

            <Stat>
                <StatLabel>Clicked</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                <StatArrow type='decrease' />
                    9.05%
                </StatHelpText>
            </Stat>
        </Flex>
        <Flex 
            minW={{ base: '100%', md: '33%', lg: '33%' }} 
            justify="space-between" 
            mb={{base: '2', md: '0'}}
        >
            <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345</StatNumber>
                <StatHelpText>
                <StatArrow type='increase' />
                    23.36%
                </StatHelpText>
            </Stat>

            <Stat>
                <StatLabel>Clicked</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                <StatArrow type='decrease' />
                    9.05%
                </StatHelpText>
            </Stat>
        </Flex>
        <Flex 
            minW={{ base: '100%', md: '33%', lg: '33%' }} 
            justify="space-between"
            mb={{base: '2', md: '0'}}
        >
            <Stat>
                <StatLabel>Sent</StatLabel>
                    <StatNumber>345</StatNumber>
                <StatHelpText>
                <StatArrow type='increase' />
                    23.36%
                </StatHelpText>
            </Stat>
            <Stat>
                <StatLabel>Clicked</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                <StatArrow type='decrease' />
                    9.05%
                </StatHelpText>
            </Stat>
        </Flex>
    </Flex>
);