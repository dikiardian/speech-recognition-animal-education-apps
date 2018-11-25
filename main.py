from flask import Flask, render_template, Response, request, flash, jsonify
import script.extractor

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    input_voice = request.form['voice']
    result = extractor.predict(input_voice)
    return jsonify({'result' : result)})
