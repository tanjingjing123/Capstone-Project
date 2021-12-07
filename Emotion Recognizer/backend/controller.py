import flask
from flask import Flask, request, Response, send_file
from translate import Translator
from flask_cors import CORS
import SpeechToTextService as stts
import TextToSpeechService as ttss

app = Flask(__name__)
CORS(app)

ch_to_en_translator = Translator(to_lang='en', from_lang='zh')
en_to_ch_translator = Translator(to_lang='zh', from_lang='en')


# API to translate text from: 1) English to Chinese 2) Chinese to English
@app.route('/translate_text')
def translate_ch():
    args = request.args
    print(args)  # For debugging
    word = args['word']
    language = args['language']

    if language == 'chinese':
        return en_to_ch_translator.translate(word)
    else:
        return ch_to_en_translator.translate(word)


# API to translate Speech to Text
@app.route("/Speech_to_text", methods=['GET', 'POST'])
def translate_speech_to_text():
    file = request.files["inputFile"]
    print(file)
    output_text = stts.get_large_audio_transcription(file)
    return output_text


# API to translate Text to Speech
@app.route("/Text_to_speech", methods=['GET', 'POST'])
def translate_text_to_speech():
    file = request.files["inputFile"]
    print(file)
    ttss.text_to_speech_service(file.filename)

    return \
        flask.send_file('/Users/hemanthharshinee/Documents/GitHub/'
                        'Capstone-Project/Emotion Recognizer/backend/output.mp3',
                               as_attachment=True)

