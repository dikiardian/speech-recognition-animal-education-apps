from flask import Flask, render_template, Response, request, flash, jsonify
import script.recognition as rc

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    input_voice = request.files['audio_data']
    input_voice.save('htk/test.wav')
    result = rc.predict()
    return jsonify({'result' : result})
