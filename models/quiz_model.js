const fs = require("fs");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const router = require("../routes/quiz_route");
let PATH = "";
/**
 *@return : if we would like to develop on app we need to manage on
 *data bd file by youing this comment @env:NODE_ENV = 'development'
 */
if (process.env.NODE_ENV === "production") {
  PATH = "./data/" + process.env.DATABASE_PRODUCTION;
} else {
  PATH = "./data/" + process.env.DATABASE_DEVELOPMENT;
}
// read develop file and

function load() {
  return JSON.parse(fs.readFileSync(PATH));
}
/**
 *
 * @param {*} quize
 *@return : this function writh data afther we delete or update

 */
function save(quize) {
  fs.writeFileSync(PATH, JSON.stringify(quize));
}

/**
 *
 * @returns all quizzes that read from the database
 */
function getAllQuizzes() {
  return load();
}

/**
 *
 * @param {*} idOneQuiz
 * @returns one quiz
 */
function getOneQuiz(idOneQuiz) {
  let quizzes = load();
  let quiz={};
  quizzes.forEach((element) => {
    if (element.id === idOneQuiz) {
      quiz = element;
    }
  });
  return quiz;
}
/**
 *
 * @param {*} newQuize :
 * @returns : create a quiz
 *  the function wil be return true if all data are valid
 */
function createQuiz(newQuiz) {
  let quizzes = load();
  let isCreated =false;
    newQuiz.id = uuidv4();
    if(newQuiz.title!=='' && newQuiz.question!=='' && newQuiz.corrections!=='' && newQuiz.choices.length==4 && newQuiz.score!=='')  {

      quizzes.push(newQuiz);
      isCreated = true;
    }
    save(quizzes);
    return isCreated;
}

/**
 *
 * @param {*} id
 * @returns remove quiz form data by id that client has provided
 */
function removeQuizeById(id) {
  let quizzes = load();
  console.log(quizzes);
  let isDeleted;
  if (id != undefined) {
    let index = quizzes.findIndex((quiz) => quiz.id === id);
    if (index >= 0) {
      quizzes.splice(index, 1);
      save(quizzes);
      isDeleted = true;
    } else {
      isDeleted = false;
    }
  }
  return isDeleted;
}
/**
 *  
 * @param {*} quiz 
 * @param {*} id 
 * @returns : update question function by id that recieved from client 
 */

function updateQuiz(quiz,id){
  let quizzes = load();
  let isUpdated = false;

  let index = quizzes.findIndex((quiz) => quiz.id==id);
  if(index !== -1){
      if(quiz.title!=='' && quiz.question !==''&&  quiz.choices.length==4 && quiz.score!=='' && quiz.corrections!==''){
        quizzes[index].title = quiz.title;
        quizzes[index].question = quiz.question;
        quizzes[index].choices = quiz.choices;
        quizzes[index].correction = quiz.correction;
        save(quizzes);
        isUpdated = true;
    
      }
    }else{
      console.log("error");
    }
    return isUpdated;
}
/**
 * export module
 */
module.exports = {
  createQuiz,
  getAllQuizzes,
  removeQuizeById,
  getOneQuiz,
  updateQuiz
};
