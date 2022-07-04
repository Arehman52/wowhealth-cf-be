import express from 'express';
import ejs from 'ejs';
import FormI from './form.model.js';

const router = express.Router();


const USERS = [
  { name: 'umer', location: 'ca', portalAllowed: 'provider'},
  { name: 'shifa', location: 'ca', portalAllowed: 'agency'},
  { name: 'bilal', location: 'ca', portalAllowed: 'business'},
  { name: 'waseem', location: 'ca', portalAllowed: 'all'},
  { name: 'aftab', location: 'ca', portalAllowed: 'affiliate'},
];


router.get("/register", (req,res)=>{
  ejs.renderFile('index.html', {}, 
    {}, (err, template) => {

    if (err) {
        console.log(err);
    } else {
        res.end(template);
    }
  });
});

router.get("/view", (req,res)=>{
  ejs.renderFile('view.html', {}, 
    {}, (err, template) => {
    if (err) {
        throw err;
    } else {
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


router.post("/getFormData", (req, res, next) => {
  FormI.findOne({ userId: req.body.userId })
    .then((document) => {
      res.status(200).json({
        message: "Fetched the form for userId = "+req.body.userId,
        form: document,
      });
    })
    .catch((err) => {
      console.log("POST /getFormData\n", err);
      res.status(500).json({
        error: err,
      });
    });
});


router.post("/submitForm", (req,res)=>{
  const formI = new FormI({
    userId: req.body.userId,
    username: req.body.username, 
    age: req.body.age, 
    address: req.body.address, 
    state: req.body.state, 
    zip: req.body.zip, 
    email: req.body.email, 
    gender: req.body.gender, 
    service: req.body.service
  });

  console.log('JSON.stringify(formI) : ',JSON.stringify(formI))
  console.log('JSON.stringify(req.body) : ',JSON.stringify(req.body))

  formI
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Form Created Successfuly",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/getUsers", (req, res, next) => {
  res.status(200).send(USERS);
});

router.get("/getUsers/getPeeps", (req, res, next) => {
  res.status(200).send("/getPeeps/getUsers");
});

router.get("/", (req, res, next) => {
  res.status(200).send("Navigating on root level US");
});


export default router;
