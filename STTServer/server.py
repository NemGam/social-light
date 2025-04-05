from flask import Flask, request, jsonify
from datetime import datetime
import os

import whisper

app = Flask(__name__)

### Server for receiving audio and extracting the text from it
# 2 Endpoints:
#   1. /getText
#   audio format is - .wav, 16-bit PCM, mono, 16000 Hz

### Global variables
Model = None

# Directory to save received audio
SAVE_DIR = "received_audio"
os.makedirs(SAVE_DIR, exist_ok=True)  # Create directory if it doesn't exist

@app.route('/getText', methods=['POST'])
def getText():
    if 'file' not in request.files:
        print("No audio sent to the server")
        return "No file part", 500
    
    file = request.files['file']
    file_bytes = file.read()  # Read once

    try:
        # Read audio
        if(file_bytes is None):
            raise Exception("Error converting bytes to audio")

        filename = f"temp.wav"
        filepath = os.path.join(SAVE_DIR, filename)

        with open(filepath, 'wb') as f_out:
            f_out.write(file_bytes)
        
        out = Model.transcribe(filepath)

        text = out["text"]
    
        # Returning extracted text
        return {"text": text},  200
        
    except Exception as e:
        print("Error when receiving audio",  e)
        return jsonify({"error": str(e)}), 500
    


if __name__ == '__main__':
    Model = whisper.load_model("tiny.en", in_memory=True)

    app.run(host='0.0.0.0', port=5000)  # Allow external access

    


