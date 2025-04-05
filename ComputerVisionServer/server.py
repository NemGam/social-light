from flask import Flask, request, jsonify
import os
import numpy as np
import cv2
from datetime import datetime

import imageAnalysis as ia

app = Flask(__name__)

### Server for receiving images and extracting the face emotion and age
# 2 Endpoints:
#   1. /sendImage
#   2. /getData


### Global variables
Emotion = None
Age = None

# Directory to save received images
SAVE_DIR = "received_images"
os.makedirs(SAVE_DIR, exist_ok=True)  # Create directory if it doesn't exist

@app.route('/sendImage', methods=['POST'])
def sendImage():
    if 'file' not in request.files:
        print("No image sent to the servers")
        return "No file part", 500
    
    file = request.files['file']
    file_bytes = file.read()  # Read once

    # Save the image safely with a unique name
    unique_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
    filepath = os.path.join(SAVE_DIR, unique_filename)
    with open(filepath, 'wb') as f_out:
        f_out.write(file_bytes)

    # Convert to OpenCV format without reusing the file stream
    image_np = np.frombuffer(file_bytes, np.uint8)
    image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

    try:
        global Age
        global Emotion
        
        # Image processing launched here
        age, emotion = ia.getData(image)

        if(age is None or emotion is None):
            raise Exception(f"Age is {age}, Emotion is {emotion}")
        
        Age = age
        Emotion = emotion
        
        # Returning nothing back
        return {"status": "success"},  200
        
    except Exception as e:
        print("Error when receiving image",  e)
        return jsonify({"error": str(e)}), 500
    

@app.route('/getData', methods=['GET'])
def getData():
    try:
        if(Age is None or Emotion is None):
            raise Exception(f"Age or Emotion is None. Age is {Age}, Emotion is {Emotion}")
        
        response = {"Emotion":Emotion, "Age":Age}
        return jsonify(response),  200

    except Exception as e:
        print("Error when packing the data",  e)
        return "Error when packing the data", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Allow external access


