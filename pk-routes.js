import { Router } from "express";

import Users from "./backend/models/user.js";
const router = Router();

router.delete("/DeleteThisUser/:Id", (req, res, next) => {
  deleteOne({ _id: req.params.Id }).then((result) => {
    res.status(200).json({
      message: "User Deleted!",
      result: result,
    });
  });
});

// router.put(
//   "/setThisUserAsInstructorOfThisLab/:InstructorzUsername",
//   (req, res, next) => {

//     queryConditions = {
//       Username: req.params.InstructorzUsername
//     };

//     DataToUpdate = {

//     };
//     Users.updateMany(queryConditions, {
//       UniversityNameOfUser: req.body.TitleOfUniversity,
//     }).then((result) => {
//       // console.log(result);
//       res.status(200).json({
//         message:
//           "For All Users' UniversityNameOfUser field Changed because Title of their University is updated!",
//         result: result,
//       });
//     });
//     console.log(
//       "   ==> {/updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged/:OldTitle} University Title and Name for Users changed."
//     );
//     console.log("   ==> req.params.OldTitle == ", req.params.OldTitle);
//   }
// );
router.put(
  "/updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged/:OldTitle",
  (req, res, next) => {
    //1stly
    //this will change UniversityNameOfUser for all matching students and teachers
    queryConditions = {
      TitleOfUniversity: null,
      UniversityNameOfUser: req.params.OldTitle,
    };
    updateMany(queryConditions, {
      UniversityNameOfUser: req.body.TitleOfUniversity,
    }).then((result) => {
      // console.log(result);
      res.status(200).json({
        message:
          "For All Users' UniversityNameOfUser field Changed because Title of their University is updated!",
        result: result,
      });
    });
    console.log(
      "   ==> {/updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged/:OldTitle} University Title and Name for Users changed."
    );
    console.log("   ==> req.params.OldTitle == ", req.params.OldTitle);
  }
);

// router.put("/UpdateThisUserWithLABJOINCODES/:Id", (req, res, next) => {
//   const user = new Users({
//     _id: req.body._id,
//     UserType: req.body.UserType,
//     FirstNameOfUser: req.body.FirstNameOfUser,
//     LastNameOfUser: req.body.LastNameOfUser,
//     UniversityNameOfUser: req.body.UniversityNameOfUser,
//     LabJoinCodesOfJoinedLabs: req.body.LabJoinCodesOfJoinedLabs,
//     RegistrationNumberOfUser: req.body.RegistrationNumberOfUser,
//     TitleOfUniversity: req.body.TitleOfUniversity,
//     HECIDofUniversity: req.body.HECIDofUniversity,
//     UserzAccessStatus: req.body.UserzAccessStatus,
//     Username: req.body.Username,
//     Password: req.body.Password,
//   });

//   Users.updateOne({ _id: req.params.Id }, user).then((result) => {
//     res.status(200).json({
//       message: "User Updated! with latest Joined Labs, /UpdateThisUserWithLABJOINCODES",
//       result: result,
//     });
//   });
//   // console.log('   ==> {/UpdateThisUser/:Id} Username == ',user.Username);
// });

router.put("/UpdateThisUser/:Id", (req, res, next) => {
  const user = new Users({
    _id: req.body._id,
    UserType: req.body.UserType,
    FirstNameOfUser: req.body.FirstNameOfUser,
    LastNameOfUser: req.body.LastNameOfUser,
    UniversityNameOfUser: req.body.UniversityNameOfUser,
    LabJoinCodesOfJoinedLabs: req.body.LabJoinCodesOfJoinedLabs,
    LabJoinCodesOfAppliedLabs: req.body.LabJoinCodesOfAppliedLabs,
    RegistrationNumberOfUser: req.body.RegistrationNumberOfUser,
    DepartmentOfUser: req.body.DepartmentOfUser,
    TitleOfUniversity: req.body.TitleOfUniversity,
    HECIDofUniversity: req.body.HECIDofUniversity,
    UserzAccessStatus: req.body.UserzAccessStatus,
    Username: req.body.Username,
    Password: req.body.Password,
  });

  updateOne({ _id: req.params.Id }, user).then((result) => {
    res.status(200).json({
      message: "User Updated!",
      result: result,
    });
  });
  // console.log('   ==> {/UpdateThisUser/:Id} Username == ',user.Username);
});

//following is a POST request to create User.
router.post("/CreateUser", (req, res, next) => {
  const user = new Users({
    UserType: req.body.UserType,
    FirstNameOfUser: req.body.FirstNameOfUser,
    LastNameOfUser: req.body.LastNameOfUser,
    UniversityNameOfUser: req.body.UniversityNameOfUser,
    RegistrationNumberOfUser: req.body.RegistrationNumberOfUser,
    DepartmentOfUser: req.body.DepartmentOfUser,
    TitleOfUniversity: req.body.TitleOfUniversity,
    HECIDofUniversity: req.body.HECIDofUniversity,
    UserzAccessStatus: req.body.UserzAccessStatus,
    Username: req.body.Username,
    Password: req.body.Password,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User has been created succefully! resposne from app.js file.",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log("   ==> {/CreateUser} Username == ", user.Username);
});

router.post("/FetchThisUniversityByItsTitle", (req, res, next) => {
  // console.log('TitleOfUniversity:: REQ.BODY ==',req.body.TitleOfUniversity);
  // console.log('TitleOfUniversity:: REQ.BODY ==',req.body);
  findOne({ TitleOfUniversity: req.body.TitleOfUniversity })
    .then((document) => {
      // console.log('DOOCCUUMMEENNTTT::....',document);
      res.status(200).json({
        message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
        user: document,
      });

      console.log(
        "   ==> {/FetchThisUniversityByItsTitle} TitleOfUniversity == ",
        req.body.TitleOfUniversity
      );
    })
    .catch((err) => {
      console.log(" 004 theeeen eeerrrororrorr\n", err);
    });
});

router.post("/FetchInstructorForThisLab", (req, res, next) => {
  let theQueryConditions = { LabJoinCodesOfJoinedLabs: req.body._id };
  findOne(theQueryConditions)
    .then((instructor) => {
      console.log("instructor::....", instructor);
      res.status(200).json({
        message: "Instructor matched and now downloaded.",
        result: instructor,
      });

      console.log(
        "   ==> {/FetchInstructorForThisLab/:LabId} Instructor Downloaded. "
      );
    })
    .catch((err) => {
      console.log("Instructor download error for this lab\n", err);
    });
});

//following is working properly in signup page for fetching users.

router.post("/FetchTHISUser", (req, res, next) => {
  findOne({ Username: req.body.Username })
    .then((document) => {
      console.log("document::....", document);
      res.status(200).json({
        message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
        user: document,
      });

      console.log("   ==> {/FetchTHISUser} Username == ", req.body.Username);
    })
    .catch((err) => {
      console.log(" 004 theeeen eeerrrororrorr\n", err);
    });
});

// FetchTHeseUserzzz
router.post("/FetchTHeseUserzzz/", (req, res, next) => {
  // let  arr:String[] = [];
  // array.forEach(element => {

  // });
  console.log("*************@@@@@: ", req.params.arrayUNs);
  console.log("*************@@@@@: ", req.body.arrayUNs);
  console.log("*************@@@@@: ", ["comsats", "bilalkhursheed", "furqan"]);
  // Users.find({ Username: { $in: ['comsats','bilalkhursheed','furqan']}})
  find({ Username: { $in: req.body.Username } })
    .then((document) => {
      console.log("USERZZZ::....", document);
      res.status(200).json({
        message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
        userzzz: document,
      });

      console.log("   ==> req.body.arrayUNs == ", req.body.arrayUNs);
    })
    .catch((err) => {
      // console.log(" 004 theeeen eeerrrororrorr\n", err);
    });
});

//following is working properly in signup page for fetching users.
router.get("/getUniversitiesList", (req, res, next) => {
  distinct("TitleOfUniversity").then((list) => {
    res.status(200).json({
      // message: "this is a list of users recieved from DB",
      theList: list,
    });

    console.log(
      "   ==> {/getUniversitiesList} :: Universities List was downloaded."
    );
  });
});

//following is working properly in signup page for fetching users.
router.get("/RecieveAllUniversitiesFromDB", (req, res, next) => {
  find({UserType: 'university', UserzAccessStatus: 'Allowed'}).then((documents) => {
    res.status(200).json({
      message: "this is a list of RecieveAllUniversitiesFromDB recieved from DB",
      users: documents,
    });

    console.log("   ==> {/RecieveAllUniversitiesFromDB} Universities were downloaded.");
  });
});
router.get("/RecieveUsersFromDB", (req, res, next) => {
  find().then((documents) => {
    res.status(200).json({
      message: "this is a list of users recieved from DB",
      users: documents,
    });

    console.log("   ==> {/RecieveUsersFromDB} Users were downloaded.");
  });
});

// router.get("/updaaaall/", (req, res, next) => {
//   Users.updateMany(
//     {
//       UserType: "university",
//     },
//     { DepartmentOfUser: "" }
//   ).then((result) => {
//     res.status(200).json({
//       message: "/updaaaall/updaaaall",
//       result: result,
//     });
//   });
// });

router.get("/ResetEntrireDatabase", (req, res, next) => {
  deleteMany({
    $or: [
      { UserType: "student" },
      { UserType: "teacher" },
      { UserType: "university" },
    ],
  }).then((result) => {
    res.status(200).json({
      message: "Entire Users Collection Resetted!",
      result: result,
    });
  });
});

export default router;
