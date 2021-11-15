from flask import Flask, jsonify, request
from translate import Translator

app = Flask(__name__)
ch_to_en_translator = Translator(to_lang='en', from_lang='zh')
en_to_ch_translator = Translator(to_lang='zh', from_lang='en')


@app.route('/convert_ch_to_en')
def convert_ch_to_en():
    txt = request.get_json()['word']
    return jsonify(ch_to_en_translator.translate(txt))


@app.route('/convert_en_to_ch')
def convert_en_to_ch():
    txt = request.get_json()['word']
    return jsonify(en_to_ch_translator.translate(txt))
