import express from 'express';
const router = express.Router();
import ejs from 'ejs';
import FormI from '../models/form.model.js';

import mysql from 'mysql2';


var con = mysql.createConnection({
  host: "35.210.208.100",
  user: "devuser",
  password: "devuser@339"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



const USERS = [
  { name: 'umer', location: 'ca', portalAllowed: 'provider'},
  { name: 'shifa', location: 'ca', portalAllowed: 'agency'},
  { name: 'bilal', location: 'ca', portalAllowed: 'business'},
  { name: 'waseem', location: 'ca', portalAllowed: 'all'},
  { name: 'aftab', location: 'ca', portalAllowed: 'affiliate'},
];


router.get("/register",(req,res)=>{
  ejs.renderFile('views/index.html', {}, 
    {}, (err, template) => {
    if (err) {
      console.log(err);
        throw err;
    } else {
      // console.log(template);
        res.end(template);
    }
  });
});


router.get("/getAllFormsData", (req, res, next) => {
  FormI.find()
    .then((document) => {
      res.status(200).json({
        message: "Fetched All form's data!",
        form: document,
      });
    })
    .catch((err) => {
      console.log("GET /getAllFormsData\n", err);
      res.status(500).json({
        error: err,
      });
    });
});


router.get("/view",(req,res)=>{
  ejs.renderFile('views/view.html', {}, 
    {}, (err, template) => {
    if (err) {
      console.log(err); 
        throw err;
    } else {
        res.end(template);
    }
  });
});


router.post("/submitForm", (req, res, next) => {
  const form = new FormI({
    userid: req.body.userid, 
    username: req.body.username, 
    age: req.body.age, 
    address: req.body.address, 
    state: req.body.state, 
    zip: req.body.zip, 
    email: req.body.email, 
    gender: req.body.gender, 
    service: req.body.service
  });

  form
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Form Created Successfuly!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});


router.delete("/delete/:Id", (req, res, next) => {
  FormI.deleteOne({ _id: req.params.Id }).then((result) => {
    res.status(200).json({
      message: "User Deleted!",
      result: result,
    });
  });
});


router.get("/postSampleForm", (req, res, next) => {
  res.status(200).send(USERS);
});
router.get("/getUsers/getPeeps", (req, res, next) => {
  res.status(200).send("/getPeeps/getUsers");
});

router.get("/", (req, res, next) => {
  
  // const connection = mysql.createConnection({
  //   host: '35.210.208.100',
  //   user: 'devuser',
  //   password: 'devuser@339',
  //   database: 'wowpk_dev'
  // });
  
  // simple query
  connection.query(
    'select * from `tbl_appointment_history`',
    function(err, results, fields) {
      if(err) console.log(err);
      // console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about results, if available
      // // res.send(JSON.stringify(results));
      try {
        res.send(results);
      } catch (error) {
        console.log(error)
        res.send(error+'');

      }
    }
  );

});

export default router;
