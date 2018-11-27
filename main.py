from flask import Flask, render_template, Response, request, flash, jsonify
import script.recognition

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    input_voice = request.files['audio_data']
    input_voice.save('static/dump/input_voice.wav')

    # result = recognition.predict()
    return jsonify({'result' : 'saved'})
