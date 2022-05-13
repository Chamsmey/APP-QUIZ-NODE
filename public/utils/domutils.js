/**
 *
 * @param {*} quizzes
 *
 * @return : create dom to create to display all the quizzes
 */
export function refreshDom(quizzes) {
  let container = document.getElementById("container");
  let contentQuiz = document.querySelector(".content-quiz");
  if (quizzes.length >  0) {
    contentQuiz.remove();
    // contain quiz
    let content = document.createElement("div");
    content.className = "content-quiz w-50 m-auto mt-5";
    content.id = "content-quiz";

    quizzes.forEach((quiz) => {
      let card = document.createElement("div");
      card.className = "card mt-3";

      let cardHeader = document.createElement("div");
      cardHeader.className = "card-header d-flex justify-content-between";

      let title = document.createElement("h2");
      title.className = "card-title";
      title.textContent = quiz.title;

      let score = document.createElement("h3");
      score.className = "card-text";
      score.textContent = quiz.score + "pt";

      let cardBody = document.createElement("div");
      cardBody.className = "card-body";

      let question = document.createElement("h5");
      question.className = "card-title";
      question.textContent = quiz.question;

      cardBody.appendChild(question);

      let choices = quiz.choices;

      for (let choice of choices) {
        let choiceDom = document.createElement("p");
        if (choice === quiz.correction){
  
          choiceDom.style.background = "#DAF7A6";
        } else {
          choiceDom.className = "card-text";
        }
        choiceDom.textContent = choice;
        cardBody.appendChild(choiceDom);
      }
      let cardFooter = document.createElement("div");
      cardFooter.className = "card-footer  d-flex justify-content-end";

      let btnDelete = document.createElement("button");
      btnDelete.className = "btn-delete btn btn-danger";
      btnDelete.dataset.id = quiz.id;

      let iconTrash = document.createElement("i");
      iconTrash.className = "fa fa-trash-o";

      let btnEdit = document.createElement("button");
      btnEdit.className = "btn-edit btn btn-primary ml-1";
      btnEdit.dataset.id = quiz.id;
      btnEdit.dataset.toggle = "modal";
      btnEdit.dataset.target = "#myModalUpdate";
      let iconEdit = document.createElement("i");
      iconEdit.className = "fa fa-edit";

      cardHeader.appendChild(title);
      cardHeader.appendChild(score);

      btnDelete.appendChild(iconTrash);
      cardFooter.appendChild(btnDelete);

      btnEdit.appendChild(iconEdit);
      cardFooter.appendChild(btnEdit);

      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      card.appendChild(cardFooter);

      content.appendChild(card);
    });
    container.appendChild(content);
  } else {
    contentQuiz.firstChild.remove();
    let imgDom = document.createElement("img");
    imgDom.setAttribute("src", "../image/empty.png");
    imgDom.className = "img-responsive";
    imgDom.style.width = "70%";
    contentQuiz.appendChild(imgDom);
  }
}

/**
 * this function to check the fiel that user fill ensure that all in formation are valid
 */
export function checkQuiz() {
  let titleDom = document.querySelector("#title");
  let questionDom = document.querySelector("#question");
  let scoreDom = document.querySelector("#score");
  let choicesDom = document.querySelectorAll(".choice");
  let choices = [];
  let newQuiz = {};
  let correct = "";
  choicesDom.forEach((choice) => {
    let valueOfChocie =
      choice.parentElement.nextElementSibling.lastElementChild.value;
    if (valueOfChocie !== "") {
      choices.push(valueOfChocie);
    }
    if (choice.checked) {
      correct = choice.parentElement.nextElementSibling.lastElementChild.value;
    }
  });
  newQuiz = {
    title: titleDom.value,
    question: questionDom.value,
    choices: choices,
    score: scoreDom.value,
    correction: correct,
  };

  return newQuiz;
}
export function hide(element) {
  element.style.display = "none";
}
export function show(element) {
  element.style.display = "block";
}

/* @param {*} quiz
 * @return : disply a quiz that user want to edit
 */

export function displayAquiz(quiz) {
  let titleDom = document.querySelector("#newTitle");
  let questionDom = document.querySelector("#newQuestion");
  let scoreDom = document.querySelector("#newScore");
  let choicesDom = document.querySelectorAll(".newChoice");

  titleDom.value = quiz.title;
  questionDom.value = quiz.question;
  scoreDom.value = quiz.score;
  let choices = quiz.choices;

  for (let index in choicesDom) {
    if (index < 4) {
      choicesDom[
        index
      ].parentElement.nextElementSibling.lastElementChild.value =
        choices[index];
      if (choices[index] === quiz.correction) {
        choicesDom[index].checked = true;
      }
    }
  }
}
/**
 *
 * @returns udate quiz by id
 */
export function checkEditQuiz() {
  let titleDom = document.querySelector("#newTitle");
  let questionDom = document.querySelector("#newQuestion");
  let scoreDom = document.querySelector("#newScore");
  let choicesDom = document.querySelectorAll(".newChoice");
  let choices = [];
  let quizEdited = {};
  let correct = "";
  choicesDom.forEach((choice) => {
    let valueOfChocie =choice.parentElement.nextElementSibling.lastElementChild.value;
    console.log(valueOfChocie);
    if (valueOfChocie !== "") {
      choices.push(valueOfChocie);
    }
    if (choice.checked) {
      correct = choice.parentElement.nextElementSibling.lastElementChild.value;
    }
  });
  quizEdited = {
    title: titleDom.value,
    question: questionDom.value,
    choices: choices,
    score: scoreDom.value,
    correction: correct,
  };
  return quizEdited;
}
