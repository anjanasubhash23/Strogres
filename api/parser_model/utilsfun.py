import spacy
import requests
import json
import re
from . import constants as cs
import os
import nltk
import pandas as pd
from spacy.lemmatizer import NOUN
from datetime import datetime
from dateutil import relativedelta
from spacy.lang.en.stop_words import STOP_WORDS
from nltk.stem import WordNetLemmatizer
import csv

nlp = spacy.load('en_core_web_sm')
# extracting text through the custom api


def extractText(url):
    response = requests.post(
        "https://extract-text-api.herokuapp.com/extract", data={"url": url})
    json_data = json.loads(response.text)
    return json_data["data"]

# extracting entity through model


def extract_enitity_model(text):
    nlp = spacy.load('test')
    doc = nlp(text)
    entities = {}
    for ent in doc.ents:
        if ent.label_ not in entities.keys():
            entities[ent.label_] = [ent.text]
        else:
            entities[ent.label_].append(ent.text)
    for key in entities.keys():
        entities[key] = list(set(entities[key]))
    return entities

# extracting entity through regex


def extract_name(text, matcher):
    pattern = [cs.NAME_PATTERN]
    matcher.add('NAME', None, *pattern)
    matches = matcher(text)
    for _, start, end in matches:
        span = text[start:end]
        if 'name' not in span.text.lower():
            return span.text


def extract_email(text):
    email = re.findall(r"([^@|\s]+@[^@]+\.[^@|\s]+)", text)
    if email:
        try:
            return email[0].split()[0].strip(';')
        except IndexError:
            return None


def extract_number(text):
    mob_num_regex = r'''((?:\+\d{2}[-\.\s]??|\d{4}[-\.\s]??)?(?:\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4}))'''
    phone = re.findall(re.compile(mob_num_regex), text)
    print(phone)
    if phone:
        number = ''.join(phone[0])
        print(number)
        return number


def extract_skills(text, noun_chunks):
    tokens = [token.text for token in text if not token.is_stop]
    data = pd.read_csv(
        os.path.join(os.path.dirname(__file__), 'skills.csv')
    )
    skills = list(data.columns.values)
    # skills = []
    # with open(os.path.join(os.path.dirname(__file__), 'skills.csv'), 'r') as file:
    #     reader = csv.reader(file, delimiter=',')
    #     for row in reader:
    #         skills.append(row)
    # fskill = []
    # for i in range(1, len(skills)):
    #     for j in range(len(skills[i])):
    #         fskill.append(skills[i][j])
    skillset = []
    # check for one-grams
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token)

    # check for bi-grams and tri-grams
    for token in noun_chunks:
        token = token.text.lower().strip()
        if token in skills:
            skillset.append(token)
    return [i.capitalize() for i in set([i.lower() for i in skillset])]


def extract_education(texts):
    education = []
    # Extract education degree
    try:
        # for index, text in enumerate(texts):
        #     for tex in text.split():
        #         tex = re.sub(r'[?|$|.|!|,]', r'', tex)
        #         if tex.upper() in cs.EDUCATION and tex not in cs.STOPWORDS:
        #             edu[tex] = text + texts[index + 1]
        for i in range(len(cs.EDUCATION)):
            if cs.EDUCATION[i] in texts.upper():
                education.append(cs.EDUCATION[i])
    except IndexError:
        pass

    # Extract year
    # education = []
    # for key in edu.keys():
    #     year = re.search(re.compile(cs.YEAR), edu[key])
    #     if year:
    #         education.append((key, ''.join(year.group(0))))
    #     else:
    #         education.append(key)
    return education


def extract_experience(text):
    # lemmatizer = nlp.vocab.morphology.lemmatizer
    wordnet_lemmatizer = WordNetLemmatizer()
    stop_words = set(STOP_WORDS)

    # word tokenization
    word_tokens = nltk.word_tokenize(text)

    # remove stop words and lemmatize
    # filtered_sentence = [
    #     w for w in word_tokens if w not
    #     in stop_words and lemmatizer(w, NOUN)
    #     not in stop_words
    # ]
    filtered_sentence = [
        w for w in word_tokens if not w in stop_words and wordnet_lemmatizer.lemmatize(w) not in stop_words]
    sent = nltk.pos_tag(filtered_sentence)

    # parse regex
    cp = nltk.RegexpParser('P: {<NNP>+}')
    cs = cp.parse(sent)
    test = []

    for vp in list(
        cs.subtrees(filter=lambda x: x.label() == 'P')
    ):
        test.append(" ".join([
            i[0] for i in vp.leaves()
            if len(vp.leaves()) >= 2])
        )
    x = [
        x[x.lower().index('experience') + 10:]
        for i, x in enumerate(test)
        if x and 'experience' in x.lower()
    ]
    return x


def extract_entity_sections_grad(text):
    text_split = [i.strip() for i in text.split('\n')]
    entities = {}
    key = False
    for phrase in text_split:
        if len(phrase) == 1:
            p_key = phrase
        else:
            p_key = set(phrase.lower().split()) & set(cs.RESUME_SECTIONS_GRAD)
        try:
            p_key = list(p_key)[0]
        except IndexError:
            pass
        if p_key in cs.RESUME_SECTIONS_GRAD:
            entities[p_key] = []
            key = p_key
        elif key and phrase.strip():
            entities[key].append(phrase)
    return entities


def get_total_experience(experience_list):
    exp_ = []
    for line in experience_list:
        experience = re.search(
            r'(?P<fmonth>\w+.\d+)\s*(\D|to)\s*(?P<smonth>\w+.\d+|present)',
            line,
            re.I
        )
        if experience:
            exp_.append(experience.groups())
        print(exp_)
    total_exp = sum(
        [get_number_of_months_from_dates(i[0], i[2]) for i in exp_]
    )
    total_experience_in_months = total_exp
    return total_experience_in_months


def get_number_of_months_from_dates(date1, date2):
    if date2.lower() == 'present':
        date2 = datetime.now().strftime('%b %Y')
    try:
        if len(date1.split()[0]) > 3:
            date1 = date1.split()
            date1 = date1[0][:3] + ' ' + date1[1]
        if len(date2.split()[0]) > 3:
            date2 = date2.split()
            date2 = date2[0][:3] + ' ' + date2[1]
    except IndexError:
        return 0
    try:
        date1 = datetime.strptime(str(date1), '%b %Y')
        date2 = datetime.strptime(str(date2), '%b %Y')
        months_of_experience = relativedelta.relativedelta(date2, date1)
        months_of_experience = (months_of_experience.years
                                * 12 + months_of_experience.months)
    except ValueError:
        return 0
    return months_of_experience
