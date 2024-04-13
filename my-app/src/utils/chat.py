import os
import time
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

def trigger_assistant(my_thread, my_assistant):
    run = openai.beta.threads.runs.create(
        thread_id=my_thread.id,
        assistant_id=my_assistant.id,
    )
    return run

def get_response(my_thread):
    messages = openai.beta.threads.messages.list(thread_id=my_thread.id)
    response = messages.data[0].content[0].text.value
    return response
