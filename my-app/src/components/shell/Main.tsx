import React, { useState } from 'react';
import { BoxProps, Box, Flex, Center, InputGroup, Text, Input, Button, InputRightElement } from '@chakra-ui/react';


export const Main = (props: BoxProps) => {
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  async function submitMessage(message: string) {
    const response = await fetch("http://127.0.0.1:8000/chat/?message=" + encodeURIComponent(message));
    const data = await response.json();
    setResponse(data.response);
  }
  
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
        <Flex height="90vh" flexDirection="column" justifyContent="space-between">
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
          <Flex width="20vw" alignSelf="flex-start" padding="2" background="#058689" borderRadius="xl" mr="4">
              <Text color="white">
                {input}
              </Text>
          </Flex>
          <Flex width="20vw" alignSelf="flex-end" padding="2" background="#058689" borderRadius="xl" >
              <Text color="white">
                {response}
              </Text>
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
              onChange={(e) => setInput(e.target.value)}
            />
            <InputRightElement width="5rem" mr="4" mt="2.5">
              <Button
                h="3rem"
                colorScheme="blue"
                size="lg"
                fontWeight="bold"
                fontSize="md"
                onClick={() => submitMessage(input)}
              >
                Enviar
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Center>
    </Box>
  );
};
