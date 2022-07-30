import express from 'express';
const router = express.Router();
import ejs from 'ejs';
import FormI from '../models/form.model.js';

import mysql from 'mysql2';


export const GenericResponseObject = {
  "status": {
      "result": "SUCCESS" || "ERROR",
      "contextID": "",
      "message": {
          "code": "SUCCESS" || "ERROR",
          "type": "INFO",
          "details": ""
      },
      "tokenExpired": false
  },
  "data": [],
  "pagination": {
      "pageNumber": 1,
      "totalNumberOfPages": 0,
      "totalNumberOfRecords": 0,
      "numberOfRecordsPerPage": 10,
      "order": "DESC",
      "paginationEnabled": true,
      "offSet": 0
  }
}




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



router.get("/getAppointmentsHistory", (req, res, next) => {
  
  
  var con = mysql.createConnection({
      host: "35.210.208.100",
      user: "devuser",
      password: "devuser@339",
      port:3306,
      database: 'wowpk_dev',
      uri:"jdbc:mysql://35.210.208.100:3306/wowpkdev",
    });
  
  con.connect(function(err) {
    if (err)
    {
      let errorResp = {};
          errorResp.message = "ERROR: unknown reason!";
          errorResp.exceptionMessage = err;
          res.status(301).send(errorResp);
    }
    console.log("Connected!");
  });
  
  
  con.query(
    'select * from `tbl_appointment_history`',
    function(err, results, fields) {
      if(err) {
        GenericResponseObject.status.message = "ERROR: Error or incorrect SQL query or API";
        GenericResponseObject.status.result = err;
        res.status(301).send(GenericResponseObject);
        }
      // var keys = [];
      // fields.forEach((item)=>{ keys.push(item['name'])});
      let mappingConfigs = {
        "ser_appointment_history_id": "appointmentHistoryId",
        "txt_operation_name" : "operationName",
        "dte_date" : "dte_date",
        "fk_appointment_id" : "appointmentId",
        "txt_details" : "details",
        "fk_user_id" : "userId"
      }
      let mappedDataa = mapper(results,mappingConfigs);
      try {
        results.forEach((value, index, array)=>{
          let obj = {
            "appointmentHistoryId" : value['ser_appointment_history_id'],
            "operationName" : value['txt_operation_name'],
            "dte_date" : value['dte_date'],
            "appointmentId" : value['fk_appointment_id'],
            "details" : value['txt_details'],
            "userId" : value['fk_user_id']
          };
          console.log(mappedDataa);
          GenericResponseObject.data.push(mappedDataa);
        });
        
        res.status(200).send(GenericResponseObject);
      } catch (error) {
        GenericResponseObject.status.message = "ERROR: Error Occured Due to an Exception";
        res.status(301).send(GenericResponseObject);
      }
    }
  );

});

export function mapper(response, mappingConfigs) {
  var mapped = [];
  if (response) {
    response.forEach((value, index, array) => {
      let obj = {};
      Object.keys(mappingConfigs).forEach((key) => {
        if(value.hasOwnProperty(key)){
          obj[mappingConfigs[key]] = value[key];
        }
      });
      mapped.push(obj);
    });
  }
  return mapped;
}

  


// router.get("/getAppointmentsHistory", (req, res, next) => {
//   console.log('req.params');
//   console.log(req.params+'');
//   var con = mysql.createConnection({
//       host: "35.210.208.100",
//       user: "devuser",
//       password: "devuser@339",
//       port:3306,
//       database: 'wowpk_dev',
//       uri:"jdbc:mysql://35.210.208.100:3306/wowpkdev",
//     });
  
//   con.connect(function(err) {
//     if (err)
//     {
//       let errorResp = {};
//           errorResp.message = "ERROR: unknown reason!";
//           errorResp.exceptionMessage = err;
//           res.status(301).send(errorResp);
//     }
//     console.log("Connected!");
//   });
  
  
//   con.query(
//     'select * from `tbl_appointment_history`',
//     function(err, results, fields) {
//       if(err) {
//         GenericResponseObject.status.message = "ERROR: Error or incorrect SQL query or API";
//         GenericResponseObject.status.result = err;
//         res.status(301).send(GenericResponseObject);
//         }
//       // var keys = [];
//       // fields.forEach((item)=>{ keys.push(item['name'])});
//       try {
//         results.forEach((value, index, array)=>{
//           let obj = {
//             "appointmentHistoryId" : value['ser_appointment_history_id'],
//             "operationName" : value['txt_operation_name'],
//             "dte_date" : value['dte_date'],
//             "appointmentId" : value['fk_appointment_id'],
//             "details" : value['txt_details'],
//             "userId" : value['fk_user_id']
//           };
//           GenericResponseObject.data.push(obj);
//         });
        
//         res.status(200).send(GenericResponseObject);
//       } catch (error) {
//         GenericResponseObject.status.message = "ERROR: Error Occured Due to an Exception";
//         res.status(301).send(GenericResponseObject);
//       }
//     }
//   );

// });
  



router.get("/", (req, res, next) => {
  res.status(200).send("You have visitied the US route.")

  // var con = mysql.createConnection({
  //   host: "35.210.208.100",
  //   user: "devuser",
  //   password: "devuser@339",
  //   port:3306,
  //   database: 'wowpk_dev',
  //   uri:"jdbc:mysql://35.210.208.100:3306/wowpkdev",
  // });

  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  // });


  // con.query('select * from `tbl_appointment_history`',
  // // con.query("SELECT COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where table_schema = 'wowpkdev' AND TABLE_NAME='tbl_appointment_history'",
  //   function(err, results, fields) {
  //     if(err) console.log(err);
  //     var resp = {}, keys = [];
  //     fields.forEach((x)=>{ keys.push(x['name'])});
  //     // Object.assign(resp,{"FIELDS" : keys});
  //     Object.assign(resp,{"FIELDS": keys});  
  //     Object.assign(resp,{"RESULTS": results});  
  //     try {
  //       res.send(resp);
  //     } catch (error) {
  //       console.log(error)
  //       res.send(error+'');

  //     }
  //   }
  // );

});

export default router;
