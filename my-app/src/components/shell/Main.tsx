import React, { useState, useEffect, useRef } from 'react';
import { BoxProps, Box, Flex, Center, InputGroup, Text, Input, Button, InputRightElement, Spinner } from '@chakra-ui/react';

export const Main = (props: BoxProps) => {
  const [input, setInput] = useState<string>("");
  const [responses, setResponses] = useState<{ input: string, response: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const conversationEndRef = useRef<HTMLDivElement>(null);

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

    setTimeout(async () => {
      const ghostResponse = await fetch("http://127.0.0.1:8000/chat/?message=ghost");
      const ghostData = await ghostResponse.json();
      const ghostNewResponse = { input: "ghost", response: ghostData.response };
      setResponses(prevResponses => {
        const updatedResponses = [...prevResponses, ghostNewResponse];
        localStorage.setItem("responses", JSON.stringify(updatedResponses));
        return updatedResponses;
      });
    }, 1000);

    setLoading(false);
  }

  useEffect(() => {
    const storedResponses = localStorage.getItem("responses");
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [responses, loading]);

  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputSubmit = () => {
    submitMessage(input);
    setInput("");
  };

  return (
    <Box as="main" {...props} borderRightWidth="1px">
      <Center
        maxW={{ base: 'xl', md: '7xl' }}
        px={{ base: '6', md: '' }}
        h="full"
        flexDirection="column"
        textAlign="center"
        color="black"
        mt="4"
      >
        <Flex height="80vh" width="66vw" flexDirection="column" overflowY="auto">
          <Flex flexDirection="column" w="50vw" alignItems="flex-start" mt="4" textAlign="start">
            <Text color="black" p="4" borderRadius="lg" bg="gray.200">
              Olá! 
              Sou o Chat24, o seu assistente virtual de saúde do Serviço Nacional de Saúde Português. 
              Como o posso ajudar hoje?
            </Text>
          </Flex>
          <Flex flexDirection="column" flex="1" width="100%" mt="4">
            {responses.map((item, index) => { 
              if (item.input !== "ghost") {
                return (
                  <Flex flexDirection="column" key={index} alignSelf={index % 2 === 0 ? "flex-end" : "flex-start"} textAlign={index % 2 === 0 ? "start" : "start"} mt="8" mr={index % 2 === 0 ? "2" : "2"}>
                    <Text color="black" p="4" borderRadius="lg" bg="blue.200">
                      {item.input}
                    </Text>
                    <Text color="black" p="4" borderRadius="lg" bg="gray.200" mt="8">
                      {item.response}
                    </Text>
                  </Flex>
                );
              }
              return null;
            })}
            <div ref={conversationEndRef} />
            {loading && (
              <Flex justifyContent="center" mt="4">
                <Spinner size="xl" color="blue.500" thickness="4px" />
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex w="67vw" mt="4">
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
        </Flex>
      </Center>
    </Box>
  );
};
