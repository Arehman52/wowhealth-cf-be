import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const formSchema = mongoose.Schema({

  userid: String, 
  username: String, 
  age: String, 
  address: String, 
  state: String, 
  zip: String, 
  email: String, 
  gender: String, 
  service: String
  // // attribs of UserType = Student/Teacher
  // FirstNameOfUser: String,
  // LastNameOfUser: String,
  // UniversityNameOfUser: String,
  // RegistrationNumberOfUser: String,
  // DepartmentOfUser: String,
  // LabJoinCodesOfJoinedLabs: [ String ],
  // LabJoinCodesOfAppliedLabs: [ String ],
  // // attribs of UserType = University
  // TitleOfUniversity: String,
  // HECIDofUniversity: String,
  // // common attribs
  // UserType: { type: String, lowercase: true},
  // UserzAccessStatus: String,
  // Username: { type: String, required: true, unique: true, lowercase: true},
  // Password: String,
});

formSchema.plugin(uniqueValidator);
const FormI = mongoose.model("Form", formSchema);
export default FormI;
// module.exports = mongoose.model("User", userSchema);
