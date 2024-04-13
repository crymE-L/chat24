import React, { useState } from 'react';
import { Box, Center, Heading, Text, Input, Button, Spinner } from '@chakra-ui/react';
import { fetchOpenAIResponse } from '../../utils/openai';

export const Hero = () => {
  return (
    <Box
      as="section"
      bg="gray.800"
      py="12"
      position="relative"
      h={{ base: '560px', md: '640px' }}
    >
      <Center
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
        h="full"
        zIndex={1}
        position="relative"
        flexDirection="column"
        textAlign="center"
        color="white"
      >
        <Heading size="2xl" fontWeight="extrabold">
          Chat 24
        </Heading>
        <Text fontSize="lg" fontWeight="medium" mt="3" pb="4">
          Improving Health, Chat by Chat
        </Text>
        <Input
          placeholder="Enter your message"
          color="white"
          bg="gray.700"
          border="none"
          mt="4"
          size="lg"
        />
        <Button
          onClick={fetchOpenAIResponse}
          colorScheme="blue"
          mt="4"
          size="lg"
          fontWeight="bold"
          fontSize="md"
        >
        </Button>
        <Text color="white" mt="4">
          Submit
        </Text>
      </Center>
    </Box>
  );
};
