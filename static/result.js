var quiz = JSON.parse(localStorage.quizResults);
document.getElementById("page").setAttribute("color-mode", quiz.theme)

function displayResults() {
    document.getElementById("background").style.display = "none";
    const [correct, incorrect, incomplete] = results()
    const grade = correct / (Object.keys(quiz.questions).length) * 100;
    document.getElementById("pie").style.setProperty("--p", grade);
    document.getElementById("pie").innerHTML = grade + "%";
    if (grade < 50) {
        document.getElementById("feedback").innerHTML = "ben je aap ofzo";
    }
    else if (70 > grade >= 50) {
        document.getElementById("feedback").innerHTML = "blijf oefenen";
    }
    else if (100 > grade >= 70) {
        document.getElementById("feedback").innerHTML = "goed gedaan";
        document.getElementById("pie").style.setProperty("--c", "green");

    }
    else if (grade == 100) {
        document.getElementById("feedback").innerHTML = `<img src="static/greenbean.jpg>`;
        document.getElementById("pie").style.setProperty("--c", "green");
    }
}

for (var i = 0; i < Object.keys(quiz.questions).length; i++) {
    document.getElementById("buttonBar").innerHTML += '<button class=button2 id=button'+ i + ' onclick=displayExcersise('+ i + ');>' + (i + 1) + '</button>';
    if (quiz.questions[i].userResult == true) {
        document.getElementById('button' + i).style.color = "green";
        document.getElementById('button' + i).style.borderColor = "green";
    }
    else if (quiz.questions[i].userResult == false) {
        document.getElementById('button' + i).style.color = "red";
        document.getElementById('button' + i).style.borderColor = "red";
    }
    else {
        document.getElementById('button' + i).style.color = "yellow";
        document.getElementById('button' + i).style.borderColor = "yellow";
    }
}

function results() {
    var correct = 0;
    var incorrect = 0;
    var incomplete = 0;
    for (var j = 0; j < Object.keys(quiz.questions).length; j++) {
        if (quiz.questions[j].userAnswer === `<input class="input" id=userAnswer` + j + `></input>`) {
            incomplete++;
        }
        else if (quiz.questions[j].userResult == true) {
            correct++;
        }
        else if (quiz.questions[j].userResult == false) {
            incorrect++;
        }
    }
    return [correct, incorrect, incomplete]
}

index = 0;
function displayExcersise(i) {
    document.getElementById("feedback").style.display = "none";
    index = i;
    let q = "";
    let a = "";
    q += "<b>" + quiz.questions[i].id + ". </b>";
    q += quiz.questions[i].context + "<br>";
    q += quiz.questions[i].question + "<br><br>";
    a += "<b>antwoord: </b>";
    a += quiz.questions[i].correct_answer + "<br>";
    a += "<b>uitleg: </b>" + quiz.questions[i].explanation + "<br><br>";
    a += "<b>jouw antwoord: </b>" + quiz.questions[i].userAnswer;
    
    document.getElementById("questions").innerHTML = q;
    document.getElementById("correctAnswer").innerHTML = a;
}

function nextExcersise() {
    if (index < Object.keys(quiz.questions).length - 1) {
        index++;
        displayExcersise(index);
    }
        
}

function previousExcersise() {
    if (index > 0) {
        index--;
        displayExcersise(index);
    }
        
}

results()
displayResults()