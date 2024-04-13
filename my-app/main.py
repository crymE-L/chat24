import os
from dotenv import load_dotenv

load_dotenv()

ASSISTANT_ID = os.getenv("ASSISTANT_ID")
api_key = os.getenv("api_key")

thread = client.beta.threads.create(
    messages=[
        {
            "role": "user",
            "content": "o meu neto queixa-se muito da garganta e nao sei o que fazer.",
        }
    ]
)

run = client.beta.threads.runs.create(thread_id=thread.id, assistant_id=ASSISTANT_ID)
print(f"Run ID: {run.id}")

while run.status != "completed":
    run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
    print(f"Run Status: {run.status}")
    time.sleep(1)
else:
    print("Run Completed!")

message_response = client.beta.threads.messages.list(thread_id=thread.id)
messages = message_response.data

latest_message = messages[0]
print(f"Response: {latest_message.content[0].text.value}")