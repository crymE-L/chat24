import React, { useState, useEffect } from 'react';
import { BoxProps, Box, Flex, Center, InputGroup, Heading, Text, Input, Button, Spinner, InputRightElement } from '@chakra-ui/react';
import { fetchOpenAIResponse } from '../../utils/openai';


export const Main = (props: BoxProps) => {
  return (
  <Box as="main" {...props} borderRightWidth="1px">
      <Center
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
        h="full"
        zIndex={1}
        position="relative"
        flexDirection="column"
        textAlign="center"
        color="black"
      >
        <Flex height="90vh">
          <Flex flexDirection="column">
            <Text fontSize="xl" as="b">
              Olá! 
            </Text>
            <Text fontSize="xl" as="b">
              Sou o Chat24, o seu assistente virtual de saúde do Serviço Nacional de Saúde Português. 
            </Text>
            <Text fontSize="xl" as="b">
              Como o posso ajudar hoje?
            </Text>
          </Flex>
          <Flex>
            <Text color="black" mt="4">
            </Text>
          </Flex>
        </Flex>
        <InputGroup size="lg">
          <Input
            py="2rem"
            placeholder="Escreva a sua mensagem"
            color="black"
            bg="white"
            border="solid"
            borderColor="black"
            borderRadius="xl"
            _focus={{ borderColor: "black" }}
          />
          <InputRightElement width="5rem" mr="4" mt="2.5">
            <Button
              h="3rem"
              colorScheme="blue"
              size="lg"
              fontWeight="bold"
              fontSize="md"
            >
              Enviar
            </Button>
          </InputRightElement>
        </InputGroup>
      </Center>
  </Box>
  );
};