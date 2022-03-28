import spacy
from spacy.matcher import Matcher
from . import utilsfun


class ResumeParser(object):

    def __init__(
        self,
        resume
    ):
        nlp = spacy.load('en_core_web_sm')
        self.matcher = Matcher(nlp.vocab)
        self.details = {
            'name': None,
            'email': None,
            'mobile_number': None,
            'skills': None,
            'college_name': None,
            'degree': None,
            'designation': None,
            'experience': None,
            'company_names': None,
            'total_experience': None,
        }
        #self.resume = resume
        self.text_raw = resume
        self.text = ' '.join(self.text_raw.split())
        self.nlp = nlp(self.text)
        self.noun_chunks = list(self.nlp.noun_chunks)
        self.get_basic_details()

    def get_extracted_data(self):
        return self.details

    def get_basic_details(self):
        cust_ent = utilsfun.extract_enitity_model(self.text)
        name = utilsfun.extract_name(self.nlp, matcher=self.matcher)
        email = utilsfun.extract_email(self.text)
        mobile = utilsfun.extract_number(
            self.text)
        degree = utilsfun.extract_education(self.text)
        skills = utilsfun.extract_skills(
            self.nlp,
            self.noun_chunks
        )
        entities = utilsfun.extract_entity_sections_grad(self.text_raw)
        print(degree)
        # extract name
        try:
            # self.details['name'] = cust_ent['Name'][0]
            self.details['name'] = name
        except (IndexError, KeyError):
            self.details['name'] = name

        # extract email
        self.details['email'] = email

        # extract mobile number
        self.details['mobile_number'] = mobile

        # extract skills
        self.details['skills'] = skills

        # extract college name
        try:
            self.details['college_name'] = entities['College Name']
        except KeyError:
            pass

        # extract education Degree
        try:
            # if cust_ent['Degree']:
            #     self.details['degree'] = cust_ent['Degree']
            # else:
            self.details['degree'] = degree
        except KeyError:
            pass

        # extract designation
        try:
            self.details['designation'] = cust_ent['Designation']
        except KeyError:
            pass

        # extract company names
        try:
            self.details['company_names'] = cust_ent['Companies worked at']
        except KeyError:
            pass

        try:
            self.details['experience'] = utilsfun.extract_experience(self.text)
            print(self.details['experience'])
            try:
                exp = round(
                    utilsfun.get_total_experience(entities['experience']) / 12,
                    2
                )
                self.details['total_experience'] = exp
            except KeyError:
                self.details['total_experience'] = 0
        except KeyError:
            self.details['total_experience'] = 0
        return


def resume_result_wrapper(resume):
    parser = ResumeParser(resume)
    return parser.get_extracted_data()
