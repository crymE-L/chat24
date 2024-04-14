# views.py

import os
import time
from django.http import JsonResponse
from openai import OpenAI

OPENAI_API_KEY = "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"
openai = OpenAI(api_key=OPENAI_API_KEY)
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

def upload_file(file_path):
    file_to_upload = openai.files.create(
        file=open(file_path, "rb"),
        purpose='assistants'
    )
    return file_to_upload

def create_assistant(assistant_name, 
                     my_instruction, 
                     uploaded_file,
                     model="gpt-3.5-turbo"):
    
    my_assistant = openai.beta.assistants.create(
        name=assistant_name,
        instructions=my_instruction,
        model=model,
        tools=[{"type": "retrieval"}],
        file_ids=[uploaded_file.id]
    )
    return my_assistant

def initiate_interaction(user_message, uploaded_file):
    my_thread = openai.beta.threads.create()
    message = openai.beta.threads.messages.create(
        thread_id=my_thread.id,
        role="user",
        content=user_message,
        file_ids=[uploaded_file.id]
    )
    return my_thread

def trigger_assistant():
    run = openai.beta.threads.runs.create(
        thread_id=my_thread.id,
        assistant_id=my_assistant.id,
    )
    return run

def chat(request):
    transformer_paper_path = "../data/health_guidance_paper.pdf"
    file_to_upload = upload_file(transformer_paper_path)

    assistant_name = "Health Line 24"
    instruction = "I want you to act as a virtual doctor, which is replacing a virtual phone health line, Health Line 24 and a screening phase in a hospital. I will describe my symptoms and you will provide a diagnosis, a treatment plan and perform a screening's hospital analysis, in which you say which bracelet I would get if I would have gone to the hospital and how much time I would be there waiting to get served. Your reply must ALWAYS have a short diagnosis and a treatment plan, with the respective bracelet and the time I would be waiting to get served in the hospital. The answer must be in Portuguese (Portugal) since I am from Portugal."
    user_message = "Eu tenho febre e tosse seca. O que devo fazer?"

    # Create the assistant
    my_assistant = create_assistant(assistant_name, instruction, file_to_upload, model="gpt-3.5-turbo")

    # Initiate interaction
    my_thread = initiate_interaction(user_message, file_to_upload)

    # Trigger the assistant
    trigger_assistant()

    # Wait for a short time to allow the assistant to generate a response
    time.sleep(5)

    messages = openai.beta.threads.messages.list(
        thread_id=my_thread.id
    )

    response = messages.data[0].content[0].text.value
    return JsonResponse({"response": response})
