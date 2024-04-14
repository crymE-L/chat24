import os
import time
from django.http import JsonResponse
from openai import OpenAI

OPENAI_API_KEY = "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"
openai = OpenAI(api_key=OPENAI_API_KEY)
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

ASSISTANT_ID = "asst_bHni39Hlf16JKbdhkEMYoHlh"
THREAD_ID = None

def create_assistant(assistant_name, 
                     my_instruction,
                     model="gpt-3.5-turbo"):
    
    my_assistant = openai.beta.assistants.create(
        name=assistant_name,
        instructions=my_instruction,
        model=model,
        tools=[{"type": "retrieval"}],
    )
    return my_assistant

def initiate_interaction(user_message):
    global THREAD_ID
    
    if not THREAD_ID:
        my_thread = openai.beta.threads.create()
        THREAD_ID = my_thread.id
    
    message = openai.beta.threads.messages.create(
        thread_id=THREAD_ID,
        role="user",
        content=user_message,
    )
    return THREAD_ID

def trigger_assistant():
    global ASSISTANT_ID, THREAD_ID
    
    if ASSISTANT_ID and THREAD_ID:
        run = openai.beta.threads.runs.create(
            thread_id=THREAD_ID,
            assistant_id=ASSISTANT_ID,
        )
        return run
    else:
        return None

def chat(request):
    global ASSISTANT_ID, THREAD_ID
    
    user_message = request.GET.get("message")
    
    if not user_message:
        return JsonResponse({"error": "Message not provided"}, status=400)

    assistant_name = "Health Line 24"
    instruction = "I want you to act as a virtual doctor, which is replacing a virtual phone health line, Health Line 24 and a screening phase in a hospital. I will describe my symptoms and you will provide a diagnosis, a treatment plan and perform a screening's hospital analysis, in which you say which bracelet I would get if I would have gone to the hospital and how much time I would be there waiting to get served. Your reply must ALWAYS have a short diagnosis and a treatment plan, with the respective bracelet and the time I would be waiting to get served in the hospital. The answer must be in Portuguese (Portugal) since I am from Portugal."

    if not ASSISTANT_ID:
        my_assistant = create_assistant(assistant_name, instruction, model="gpt-3.5-turbo")
        ASSISTANT_ID = my_assistant.id

    thread_id = initiate_interaction(user_message)

    trigger_assistant()

    time.sleep(5)

    messages = openai.beta.threads.messages.list(thread_id=thread_id)

    if messages and messages.data:
        response = messages.data[0].content[0].text.value
        print(response)
        return JsonResponse({"response": response})
    else:
        return JsonResponse({"error": "No response from assistant"}, status=500)
