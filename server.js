
require("dotenv").config();
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const cors = require('cors');
app.use(cors({ origin: '*' }));
app.use(express.static("public"));

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("listening on port : " + PORT));
const quizRouter = require("./routes/quiz_route.js");


// create route 
app.use("/api/quiz",quizRouter);
