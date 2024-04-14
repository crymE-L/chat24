import React, { useState, useEffect } from 'react';
import { BoxProps, Box, Flex, Center, InputGroup, Text, Input, Button, InputRightElement, Spinner } from '@chakra-ui/react';

export const Main = (props: BoxProps) => {
  const [input, setInput] = useState<string>("");
  const [responses, setResponses] = useState<{ input: string, response: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  

  async function submitMessage(message: string) {
    setLoading(true);
    const response = await fetch("http://127.0.0.1:8000/chat/?message=" + encodeURIComponent(message));
    const data = await response.json();
    const newResponse = { input: message, response: data.response };
    setResponses(prevResponses => {
      const updatedResponses = [...prevResponses, newResponse];
      localStorage.setItem("responses", JSON.stringify(updatedResponses));
      return updatedResponses;
    });
    setLoading(false);
  }

  useEffect(() => {
    const storedResponses = localStorage.getItem("responses");
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  const handleInputSubmit = () => {
    submitMessage(input);
    setInput("");
  };

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
        <Flex height="90vh" width="65vw" flexDirection="column" overflowY="auto">
          <Flex flexDirection="column" w="50vw" alignItems="flex-start" mt="4">
            <Text color="black" p="1" borderRadius="lg" bg="gray.200">
              Olá! 
              Sou o Chat24, o seu assistente virtual de saúde do Serviço Nacional de Saúde Português. 
              Como o posso ajudar hoje?
            </Text>
          </Flex>
          <Flex flexDirection="column" flex="1" width="100%" mt="4">
            {responses.map((item, index) => ( 
              <Flex key={index} alignSelf={index % 2 === 0 ? "flex-end" : "flex-start"} textAlign={index % 2 === 0 ? "start" : "start"} mt="4">
                <Text color="black" p="4" borderRadius="lg" bg={index % 2 === 0 ? "blue.200" : "gray.200"}>
                  {index % 2 === 0 ? item.input : item.response}
                </Text>
              </Flex>
            ))}
            {loading && (
              <Flex justifyContent="center">
                <Spinner size="xl" color="blue.500" thickness="4px" />
              </Flex>
            )}
          </Flex>
        </Flex>
        <InputGroup size="lg" mt="4">
          <Input
            py="2rem"
            placeholder="Escreva a sua mensagem"
            color="black"
            bg="white"
            border="solid"
            borderColor="black"
            borderRadius="xl"
            _focus={{ borderColor: "black" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleInputSubmit();
              }
            }}
          />
          <InputRightElement width="5rem" mr="4" mt="2.5">
            <Button
              h="3rem"
              colorScheme="blue"
              size="lg"
              fontWeight="bold"
              fontSize="md"
              onClick={handleInputSubmit}
            >
              Enviar
            </Button>
          </InputRightElement>
        </InputGroup>
      </Center>
    </Box>
  );
};
