import { useState } from 'react';
import { Button, Input, VStack, Text, Spinner } from '@chakra-ui/react';
import OpenAI from 'openai';
import { runInContext } from 'vm';

export const InputSection = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleRequestSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from OpenAI API');
      }

      const data = await response.json();
      setResponse(data.choices[0].text);
    } catch (error) {
      setError('An error occurred while fetching the response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="flex-start">
      <Input
        placeholder="Enter your input..."
        value={inputText}
        onChange={handleInputChange}
      />
      <Button colorScheme="blue" onClick={handleRequestSubmit} disabled={loading}>
        {loading ? <Spinner size="sm" color="white" /> : 'Submit'}
      </Button>
      {error && <Text color="red.500">{error}</Text>}
      {response && <Text>{response}</Text>}
    </VStack>
  );
};

export default InputSection;
