require("./db/connection"); // Run's database connection Immediately
const express = require("express");
const cors = require("cors");
const userRouter = require("./user/routes");
// const movieRouter = require("./movie/routes");
const  bodyParser = require('body-parser'); 

const port = process.env.PORT || 5001
const app = express();

//------------------------------------------------------------------------------------------------------------
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));
//Possible problems with hosting. This is liked to the body-parser
//------------------------------------------------------------------------------------------------------------

//add relevant routes and controllers to app before listen runs
app.use(express.json()); // Tell entire server that it will always recieve JSON, and to always send back JSON
app.use(cors());
// app.use(userRouter, movieRouter);
app.use(userRouter);
app.get("/health", (req, res) => {
  res.status(200).send({ message: "API is working" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//------------------------------------------------------------------------------------------------------------