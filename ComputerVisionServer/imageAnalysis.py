from deepface import DeepFace

def getData(image):
    try:
        result = DeepFace.analyze(image, actions=['age', 'emotion'])
        
        age = result[0]['age']
        emotion = result[0]['dominant_emotion']
        return (age, emotion)
    
    except Exception as e:
        print("Deepface Detection Error:", e)
        return (None, None)
