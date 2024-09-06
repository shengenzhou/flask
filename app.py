from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from openai import OpenAI
import json
import os
import threading

app = Flask(__name__)
SECRET_KEY = str(os.urandom(24))
app.secret_key = SECRET_KEY

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/submit', methods=['POST'])
def submit_input():
    theme = request.form['theme']
    grade = request.form['grade']
    category = request.form['category']
    
    session['ready'] = False
    session['result'] = None
    
    question = f'maak 10 verhaaltjessommen voor {grade} met {theme} termen. Doe vragen met {category}. Met antwoorden en uitleg in een JSON structuur als volgt '
    format = '{\"questions\":[{\"id\":1,\"context\":\"Context for question 1.\",\"question\":\"Question\",\"correct_answer\":\"Answer 1\",\"explanation\":\"Explanation for answer 1.\"}'

    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    response = client.chat.completions.create(
    model="gpt-4o-mini",
    response_format={ "type": "json_object" },
    messages=[
        {f"role": "system", "content": "jij maakt rekenopdrachten in JSON format"},
        {f"role": "user", "content": question + format}
    ]
    )

    message_content = response.choices[0].message.content
    message_json = json.loads(message_content)
    message_json["theme"] = theme  # add theme to dict so that we can use it in the next few pages

    session['result'] = message_json
    session['ready'] = True
    return jsonify({'status': 'processing'})

@app.route('/check_status')
def check_status():
    if 'ready' in session:
        return jsonify({'ready': session['ready']})
    return jsonify({'ready': False})

@app.route('/quiz', methods=['GET'])
def quiz():
    if session.get('ready'):
        return render_template('quiz.html', message_json=session['result'])
    else:
        return redirect(url_for('/'))
    

@app.route("/result", methods=["GET", "POST"])
def result():
    return render_template("result.html")


if __name__ == '__main__':
    app.run