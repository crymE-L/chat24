import { OpenAI } from 'openai';

const ASSISTANT_ID = 'asst_bHni39Hlf16JKbdhkEMYoHlh';

export async function fetchOpenAIResponse(inputMessage: string) {
  const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-16k-0613',
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
  return response?.choices[0]?.message?.content || '';
}
