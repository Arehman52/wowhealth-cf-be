import express from 'express';
import ejs from 'ejs';
import path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();


const USERS = [
  { name: 'umer', location: 'ca', portalAllowed: 'provider'},
  { name: 'shifa', location: 'ca', portalAllowed: 'agency'},
  { name: 'bilal', location: 'ca', portalAllowed: 'business'},
  { name: 'waseem', location: 'ca', portalAllowed: 'all'},
  { name: 'aftab', location: 'ca', portalAllowed: 'affiliate'},
];


router.get("/register", (req,res)=>{
  // console.log('isisisisi');
  // if(req.url === '/register' ){
  //   console.log('isisisisi   2');
  //   res.writeHead(200, {'Content-type' : 'text/html'});
  //   fs.createReadStream(path.join(path.join(__dirname,'script.js'),'split.css'), 'utf8' ).pipe(res);
  // }


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
