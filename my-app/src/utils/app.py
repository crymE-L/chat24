from flask import Flask, request, jsonify
from chat import initiate_interaction, trigger_assistant, get_response, upload_file, create_assistant

app = Flask(__name__)

transformer_paper_path = "../data/health_guidance_paper.pdf"
file_to_upload = upload_file(transformer_paper_path)

assistant_name = "Health Line 24"
instruction = "I want you to act as a virtual doctor, which is replacing a virtual phone health line, Health Line 24 and a screening phase in a hospital. I will describe my symptoms and you will provide a diagnosis, a treatment plan and perform a screening's hospital analysis, in which you say which bracelet I would get if I would have gone to the hospital and how much time I would be there waiting to get served. Your reply must ALWAYS have a short diagnosis and a treatment plan, with the respective bracelet and the time I would be waiting to get served in the hospital. The answer must be in Portuguese (Portugal) since I am from Portugal."

my_assistant = create_assistant(assistant_name, instruction, file_to_upload, model="gpt-3.5-turbo")

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'error': 'Message not provided'}), 400

    my_thread = initiate_interaction(user_message, file_to_upload)
    trigger_assistant(my_thread, my_assistant)
    response = get_response(my_thread)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
