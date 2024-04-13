import React, { useState, useEffect } from 'react';
import { Box, Flex, Center, Heading, Text, Input, Button, Spinner } from '@chakra-ui/react';
import { fetchOpenAIResponse } from '../../utils/openai';
import { Shell } from '../shell/Shell';

export const Chat = () => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isDefaultPromptSent, setIsDefaultPromptSent] = useState(false);

  useEffect(() => {
    if (!isDefaultPromptSent) {
      sendDefaultPrompt();
    }
  }, [isDefaultPromptSent]);

  const sendDefaultPrompt = async () => {
    setIsLoading(true);
    try {
      const defaultPrompt = `I want you to act as a virtual doctor, which is replacing a virtual phone health line, Health Line 24 and a screening phase in an hospital. I will describe my symptoms and you will provide a diagnosis, a treatment plan and perform a screening's hospital analysis, in which you say which bracelet I would get if I went to the hospital and how much time I would be there waiting to get served. You should only reply with your diagnosis and treatment plan, with the bracelet and the time I would be waiting to get server, in the hospital. The answer must be in portuguese (Portugal) since I am Portugal.`;
      
      const defaultResponse = await fetchOpenAIResponse(defaultPrompt);
      setResponse(defaultResponse);
      setIsDefaultPromptSent(true);
    } catch (error) {
      console.error('Error sending default prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const prompt = `${response}\n\n${userInput}`;
      
      const nextResponse = await fetchOpenAIResponse(prompt);
      setResponse(nextResponse);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <Flex flexDirection="column">
          <Heading size="2xl" fontWeight="extrabold">
            Chat 24
          </Heading>
          <Text fontSize="lg" fontWeight="medium" mt="3" pb="4">
            Improving Health, Chat by Chat
          </Text>
        </Flex>
        <Box position="relative">
          <Flex flexDirection="column">
            <Text fontSize="xl" as="b">
              Olá! 
            </Text>
            <Text fontSize="xl" as="b">
              Sou o Chat24, o seu assistente virtual de saúde do Serviço Nacional de Saúde Português. 
            </Text>
            <Text fontSize="xl" as="b">
              Como posso o posso hoje?
            </Text>
          </Flex>
          <Flex>
            <Text color="white" mt="4">
              {response}
            </Text>
          </Flex>
        </Box>
        <Input
          placeholder="Enter your message"
          color="white"
          bg="gray.700"
          border="none"
          mt="4"
          size="lg"
          value={inputMessage} // Bind the input value to state
          onChange={(e) => setInputMessage(e.target.value)} // Update state on input change
        />
        <Button
          onClick={handleButtonClick}
          colorScheme="blue"
          mt="4"
          size="lg"
          fontWeight="bold"
          fontSize="md"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : 'Submit'}
        </Button>
      </Center>
    </Box>
  );
};
