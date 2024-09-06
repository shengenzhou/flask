var index = 0;
console.log(quiz)
window.onload = function() {
        displayExcersise(0);
        console.log("loading complete")
    }
    
for (var j = 0; j < Object.keys(quiz.questions).length; j++) {
    document.getElementById("buttonBar").innerHTML += '<button class=button2 id=button'+ j + ' onclick=displayExcersise('+ j + ');>' + (j + 1) + '</button>';
    var input = document.createElement("input");
    input.className = "input";
    input.id = "userAnswer" + j;
    input.hidden = true;
    input.inputMode = "numeric"
    var element = document.getElementById("answerBar").appendChild(input);
    quiz.questions[j]["userAnswer"] = element;
}

function displayExcersise(i) {
    document.getElementById("userAnswer" + index).hidden = true; // hide previous input
    index = i;
    document.getElementById("answerDiv").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("next").style.display = "none";
    document.getElementById("userAnswer" + i).hidden = false; // show current input
    document.getElementById("userAnswer" + i).focus();
    let q = "";
    let a = "";
    q += "<b>" + quiz.questions[i].id + ". </b>";
    q += quiz.questions[i].context + "<br>";
    q += "<b>" + quiz.questions[i].question + "</b>" + "<br>";
    q += document.getElementById("userAnswer" + i).innerHTML;
    a += "<b>antwoord: </b>";
    a += quiz.questions[i].correct_answer + "<br>";
    a += "<b>uitleg: </b>" + quiz.questions[i].explanation + "<br>";
    document.getElementById("userAnswer" + i).addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("enterAnswer").click();
        }
        });
    if (i == Object.keys(quiz.questions).length - 1 && document.getElementById("userAnswer" + i).value !== "") {
        document.getElementById("next").style.display = "none";
        document.getElementById("result").style.display = "block";
    }
    document.getElementById("questions").innerHTML = q;
    document.getElementById("correctAnswer").innerHTML = a;
}

function nextExcersise() {
    if (index < Object.keys(quiz.questions).length - 1) {
        displayExcersise(index + 1);
    }
        
}

function previousExcersise() {
    if (index > 0) {
        displayExcersise(index - 1);
    }
        
}

function toggleAnswer() {
    var x = document.getElementById("answerDiv");
        if (x.style.display === "none") {
            x.style.display = "block";
            var input = document.getElementById("userAnswer" + index).value;
            document.getElementById("userAnswer").innerHTML = "<b>jouw antwoord: </b>" + input;
            
        } 
        else {
            x.style.display = "none";
        }
  
}

function checkAnswer(answer) {
    if (answer === "correct") {
        document.getElementById('button' + index).style.color = "green";
        document.getElementById('button' + index).style.borderColor = "green";
        quiz.questions[index]["userResult"] = true;
        var input = document.getElementById("userAnswer" + index).value;
        quiz.questions[index].userAnswer = input;
        document.getElementById("next").style.display = "block";
        var element = document.getElementById("answerDiv");
        element.scrollTop = element.scrollHeight;
    }
    else if (answer === "incorrect") {
        document.getElementById('button' + index).style.color = "red"
        document.getElementById('button' + index).style.borderColor = "red";
        quiz.questions[index]["userResult"] = false;
        var input = document.getElementById("userAnswer" + index).value;
        quiz.questions[index].userAnswer = input;document.getElementById("next").style.display = "block";
        var element = document.getElementById("answerDiv");
        element.scrollTop = element.scrollHeight;
    }
    if (index == Object.keys(quiz.questions).length - 1) {
        document.getElementById("next").style.display = "none";
        document.getElementById("result").style.display = "block";
        var element = document.getElementById("answerDiv");
        element.scrollTop = element.scrollHeight;
    }
}

function saveResults() {
    for (var j = 0; j < Object.keys(quiz.questions).length; j++) {
        if (document.getElementById("userAnswer" + j).value === "") {
            quiz.questions[j]["userAnswer"] = "...";
        }
        if (quiz.questions[j]["userResult"] == null) {
            quiz.questions[j]["userAnswer"] = document.getElementById("userAnswer" + j).value;
        }
    }
    localStorage.quizResults=JSON.stringify(quiz);
}

