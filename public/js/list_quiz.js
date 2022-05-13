// llist all quiz

import { refreshDom, checkQuiz, displayAquiz,checkEditQuiz} from '../utils/domutils.js';
// get dat and this play 
function displayQuiz() {
  let URL = "/api/quiz";
  axios.get(URL)
    .then((response) => {
      let quizzes = response.data;
      console.log(quizzes);
      refreshDom(quizzes);
    })
}
// create new quiz instance

function createQuiz() {

  let newQuiz = checkQuiz();
  console.log(newQuiz);
 axios.post("/api/quiz", newQuiz)
 .then((response) => {
   console.log(response.data);
 });
 displayQuiz();
}
/**
   * 
   * @param {*} e
   * @returns : eventerlistener  
   */
function checked(e) {
  e.preventDefault();
  let btnUpdate = document.querySelector('.btnUpdate');
  if (e.target.className === "btn-delete btn btn-danger") {
    deleteQuiz(e.target.dataset);
  } else if (e.target.className === "fa fa-trash-o") {
    deleteQuiz(e.target.parentElement.dataset);
  }
  else if (e.target.className === "fa fa-edit") {
    console.log(e.target.parentElement.dataset.id);
    btnUpdate.dataset.id = e.target.parentElement.dataset.id;
    getQuizById(e.target.parentElement.dataset);

  } else if (e.target.className === "btn-edit btn btn-primary ml-1") {
    btnUpdate.dataset.id = e.target.dataset.id;
    getQuizById(e.target.dataset);
  }
  else if (e.target.id === "btnUpdate") {
    updatedQuiz(e.target.dataset.id);
  }
  else {
    console.log("not found");
  }
}
  
/**
 * @param {*} remove quize
 */

function deleteQuiz(id) {
  let quizId = id.id;
  axios.delete("/api/quiz/" + quizId);
  displayQuiz();
}

function getQuizById(id) {
  let quizId = id.id;
  axios.get("/api/quiz/" + quizId)
    .then(response => {
      displayAquiz(response.data);
    })
}
function updatedQuiz(e) {
  let quizUpdate = checkEditQuiz();
  console.log(quizUpdate);
  let id = e.target.dataset.id;
  axios.patch("/api/quiz/" + id, quizUpdate)
  .then(response => {
    console.log(response.data);
  });
  displayQuiz();
}
// call back function
displayQuiz();
let btnSubmit = document.querySelector("#btnSubmit");
let btnUpdate = document.querySelector("#btnUpdate");
btnUpdate.addEventListener("click", updatedQuiz);
btnSubmit.addEventListener("click", createQuiz);
document.getElementById('container').addEventListener('click', checked);


