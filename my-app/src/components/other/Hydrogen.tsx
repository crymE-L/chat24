import {
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'

  export default function Hydrogen() {
    return (
        <Flex justifyContent="space-between" mr='4' ml='4'>
            <Stat>
                <StatLabel>Hydrogen Sent</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                <StatArrow type='increase' />
                    23.36%
                </StatHelpText>
            </Stat>
            <Stat>
                <StatLabel>Hydrogen Produced</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                <StatArrow type='decrease' />
                    9.05%
                </StatHelpText>
            </Stat>
            <Stat>
                <StatLabel>Magic Hydrogen</StatLabel>
                <StatNumber>83</StatNumber>
                <StatHelpText>
                <StatArrow type='decrease' />
                    2.09%
                </StatHelpText>
            </Stat>
        </Flex>
        );
    };

export { Hydrogen };