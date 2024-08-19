var quiz = JSON.parse('{{ message_json | tojson | safe }}');

function displayExcersise() {
    console.log(quiz.questions)
}