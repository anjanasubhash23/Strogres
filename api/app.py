from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
import spacy
import re
from parser_model import finalModel
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
app = Flask(__name__)
CORS(app)


@app.route("/extractData", methods=["POST", "GET"])
def extractData():
    body = request.get_json()
    data = finalModel.resume_result_wrapper(body.get("data"))
    return data


@app.route("/rankresume", methods=["POST", "GET"])
def rankData():
    body = request.get_json()
    textjd = body.get("text")
    textcv = body.get("jd")
    #print (textjd)
    #print (textcv)
    documents = [textjd, textcv]
    count_vectorizer = CountVectorizer()
    sparse_matrix = count_vectorizer.fit_transform(documents)
    doc_term_matrix = sparse_matrix.todense()
    df = pd.DataFrame(doc_term_matrix,
                      columns=count_vectorizer.get_feature_names(),
                      index=['textjd', 'textcv'])
    answer = cosine_similarity(df, df)
    answer = pd.DataFrame(answer)
    answer = answer.iloc[[1], [0]].values[0]
    answer = round(float(answer), 4)*10
    return answer


if __name__ == "__main__":
    app.debug = True
    app.run()
