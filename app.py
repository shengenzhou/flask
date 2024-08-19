from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from openai import OpenAI
import json
import os

app = Flask(__name__)
SECRET_KEY = str(os.urandom(24))
app.secret_key = SECRET_KEY

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/quiz", methods=["POST"], endpoint="process_output") 
def output():
    theme = request.form["theme"]
    grade = request.form["grade"]
    question = f'maak 10 verhaaltjessommen voor {grade} met {theme} termen. Doe vragen met breuken, procenten, verhoudingen, optellen, aftrekken, vermenigvuldigen en delen. Met antwoorden en uitleg in een JSON structuur als volgt '
    format = '{\"questions\":[{\"id\":1,\"context\":\"Context for question 1.\",\"question\":\"Question for question 1\",\"correct_answer\":\"Answer 1\",\"explanation\":\"Explanation for answer 1.\"}'

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
    session['message_json'] = message_json

    # Redirect to the GET route
    return redirect(url_for('show_output'))

@app.route("/quiz", methods=["GET"])
def show_output():
    # Retrieve the result from the session
    message_json = session.get('message_json', {"empty": "json"})
    return render_template("request.html", message_json=message_json)

@app.route("/result", methods=["GET", "POST"])
def result():
    return render_template("result.html")

@app.route("/") #testing case 
def output():
    with open('sample.json') as f:
        message_json = json.load(f)
    return render_template("request.html", message_json=message_json)

if __name__ == '__main__':
    app.run