import express from 'express';
import USRoutes from './routes/us-routes.js';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import ejs from 'ejs';

const app = express();
var str = 'CONNECTING...';

mongoose.connect("mongodb+srv://abdurrehman:MvceaEr8JnRkWkl7@cluster0.jlslm.mongodb.net/GBCLDatabse",{ useNewUrlParser: true,
useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB.");
    str = "CONNECTED";
  })
  .catch((err) => {
    console.log("FAILED to connect with the DB!!!, Errors are as below:");
    console.log(err);
  });



  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   res.setHeader("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept");


//   res.setHeader("Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();

// });


app.get("/", (req, res, next) => {
  res.status(200).json("Server is running!  ==>"+str);
});




app.use("/us", USRoutes);
app.use(getDefault);

function getDefault(req, res){ res.status(404).json("Bad URL, error 404!")}



export const appJS = app;
export default app;