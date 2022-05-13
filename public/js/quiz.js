import {hide,show} from "../utils/domutils.js";
// dom 
const dom_score = document.querySelector(".score");
const quiz_play = document.querySelector(".playQuiz");
let dom_score_p = document.getElementById("score-show");

let currentQuestionIndex = 0;
let score = 0;

function renderQuestion() {
    let URL = "http://localhost:80/api/quiz";

    axios.get(URL)
      .then((response) => {
          while (quiz_play.firstChild){
            quiz_play.removeChild(quiz_play.firstChild);
          }
        let quizzes = response.data;
        let question = quizzes[currentQuestionIndex];
        let choices = question.choices;

        let card_container = document.createElement("div");
        card_container.className = "card m-auto mt-5 col-6";

        quiz_play.appendChild(card_container);
        let card_body = document.createElement("div");

        card_body.className = "card-body";
        card_container.appendChild(card_body);
        
        let card_title = document.createElement("div");
        card_title.className = "card-title d-flex justify-content-between";
        card_body.appendChild(card_title);

        let h2 = document.createElement("h4");
        h2.id = "question";
        h2.textContent = question.question;
        
        let h5 = document.createElement("h5");
        h5.className = "mt-2";
        h5.id = "score";
        h5.textContent = question.score;
        card_title.appendChild(h2);
        card_title.appendChild(h5);
        let hr = document.createElement("hr");
        card_body.appendChild(hr);
        let card_text = document.createElement("div");
        card_text.className = "card-text";
        card_body.appendChild(card_text);

      
        let container = document.createElement("div");
        container.className = "container";
        card_text.appendChild(container);
        let div2 = document.createElement("div");
        div2.className = "answer-containers";
        for (let i = 0; i <choices.length; i++){
            let button = document.createElement("button");
            button.className = "btn m-3";
            button.style.background = "#C18FF4";
            button.textContent = choices[i];
            button.addEventListener("click", returnValue);
            div2.appendChild(button);
        }
        container.appendChild(div2);
      })
}

function returnValue(event) {
    checkAnswer(event.target.textContent);
    console.log(event.target.textContent);
}

// getUserChoice();
function checkAnswer(choice) {
    let URL = "http://localhost:80/api/quiz";
    axios.get(URL)
    .then((response) => {
        let quizzes = response.data;
        let question = quizzes[currentQuestionIndex];
        let correctAn = question.correction;
        console.log(correctAn);
        if (correctAn == choice){
            score += 1;
        }else if ( correctAn !== choice){
            score += 0;
        }
        if (currentQuestionIndex < quizzes.length - 1) {
            // Go to the next question
            currentQuestionIndex += 1;

            // Render the nex quesiton
            renderQuestion();
            // show score
        }else{
            showScore();
        }
    })
}
// Compute score
function showScore() {
    hide(quiz_play);
    show(dom_score);
    // dom_score_p.textContent = score;
    let URL = "http://localhost:80/api/quiz";
    axios.get(URL).then((results) => {
    // // calculate the amount of question percent answered by the user
      let questions = results.data;
      const scorePerCent = Math.round((100 * score) / questions.length);  
      dom_score_p.textContent = "Your Score is : " +scorePerCent + " %";
    });
  }
renderQuestion();





















