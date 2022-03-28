from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
import spacy
import re
from parser_model import finalModel
app = Flask(__name__)
CORS(app)


@app.route("/extractData", methods=["POST", "GET"])
def extractData():
    body = request.get_json()
    data = finalModel.resume_result_wrapper(body.get("data"))
    return data


if __name__ == "__main__":
    app.debug = True
    app.run()
