const express = require("express");
const router = express.Router();

const serverModel = require("../models/quiz_model");

// get all quizzes route
router.get("/", (req, res) => {
  let quizzes = serverModel.getAllQuizzes();
  res.send(quizzes);
});

/**
 * return one quiz route
 */
router.get("/:id", (req, res) => {
  let idOfQuiz = req.params.id;

  let getIdOfQuiz = serverModel.getOneQuiz(idOfQuiz);

  res.send(getIdOfQuiz);
});

// Create route
router.post("/", (req, res) => {
  let newQuizes = req.body;
  let message;
  let isCreated = serverModel.createQuiz(newQuizes);
  if (isCreated) {
    message = "Created successfully";
  } else {
    message = "quize invalid";
  }
  res.send({ message: message });
});

/**
 * delete quiz
 */
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  let isDelete = serverModel.removeQuizeById(id);
  let message;
  if (isDelete) {
    message = "Deleted successfully";
  } else {
    message = "not delete";
  }
  res.send({ message: message });
});

/**
 * @params : id of quiz
 * @returns : this route for updateQuiz by id
 */

router.patch("/:id", (req, res) => {
  let id = req.params.id;
  message = "";
  let isUpdate = serverModel.updateQuiz(req.body, id);
  if (isUpdate) {
    message = "updated successfully !";
  } else {
    message = "could not updated";
  }
  res.send({ message: message });
});
module.exports = router;

/**
 * update quiz
 */
