import { OpenAI } from 'openai';
import os from 'os';
import load_dotenv from 'dotenv';

const ASSISTANT_ID = 'asst_bHni39Hlf16JKbdhkEMYoHlh';

export async function fetchOpenAIResponse() {
    const openai = new OpenAI({
        apiKey: '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', 
        dangerouslyAllowBrowser: true
    });
    
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k-0613",
        temperature: 0.5,
        messages: [
            {
              role: "user",
              content: "Hello! How are you?",
            },
          ],
        max_tokens: 400,
        stream: false,
    });
    console.log(response.choices[0].message.content)
}