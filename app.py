from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS
import subprocess
import os
import sys

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Index
@app.route('/')
def index():
    return send_file(os.path.join(BASE_DIR, 'html', 'index.html'))

# html
@app.route('/<path:filename>')
def html(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'html'), filename)

# css
@app.route('/css/<path:filename>')
def css(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'css'), filename)

# json
@app.route('/json/<path:filename>')
def json(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'json'), filename)

# documentos
@app.route('/documentos/<path:filename>')
def documentos(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'documentos'), filename)

# img
@app.route('/img/<path:filename>')
def img(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'img'), filename)

# js
@app.route('/js/<path:filename>')
def js(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'js'), filename)

# Ejecución                                             
if __name__ == '__main__':
    app.run(debug=True)


