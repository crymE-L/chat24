import { OpenAI } from 'openai';

const ASSISTANT_ID = 'asst_bHni39Hlf16JKbdhkEMYoHlh';

export async function fetchOpenAIResponse(inputMessage: string) {
  const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
  });

  const response = await openai.chat.completions.create({
    model: ASSISTANT_ID, // Use the assistant ID instead of the regular GPT model
    temperature: 0.5,
    messages: [
      {
        role: "user",
        content: inputMessage,
      },
    ],
    max_tokens: 400,
    stream: false,
  });

  // Return an empty string if response is null or undefined
  return response?.choices[0]?.message?.content || '';
}
