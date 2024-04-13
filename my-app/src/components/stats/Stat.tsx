import { Badge, Box, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { FiArrowDownRight, FiArrowUpRight, FiMoreVertical } from 'react-icons/fi'

interface Props {
  label: string
  value: string
  delta: {
    value: string
    isUpwardsTrend: boolean
  }
}
export const Stat = (props: Props) => {
  const { label, value, delta, ...boxProps } = props
  return (
    <Box
      px={{ base: '4', md: '6' }}
      py={{ base: '5', md: '6' }}
      bg="bg.surface"
      borderRadius="lg"
      boxShadow="sm"
      {...boxProps}
    >
      <Stack>
        <HStack justify="space-between">
          <Text textStyle="sm" color="fg.muted">
            {label}
          </Text>
          <Icon as={FiMoreVertical} boxSize="5" color="fg.muted" />
        </HStack>
        <HStack justify="space-between">
          <Heading size={{ base: 'sm', md: 'md' }}>{value}</Heading>
          <Badge variant="pill" colorScheme={delta.isUpwardsTrend ? 'green' : 'red'}>
            <HStack spacing="1">
              <Icon as={delta.isUpwardsTrend ? FiArrowUpRight : FiArrowDownRight} />
              <Text>{delta.value}</Text>
            </HStack>
          </Badge>
        </HStack>
      </Stack>
    </Box>
  )
}