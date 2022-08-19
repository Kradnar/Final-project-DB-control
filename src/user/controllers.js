const jwt = require("jsonwebtoken")
const User = require("./model");
//--------------------------------------------------------------------------------------------------------------
exports.createUser = async (req, res) => {
  try {
    console.log("Creating User...")
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.send({ msg: newUser });
  }
//--------------------------------------   
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};
//--------------------------------------------------------------------------------------------------------------
exports.login = async (req, res) => {
  try {
    console.log("Logging In...")
    const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET); //create token with user._id inside
    res.send({ user: req.user.username, token });
  } 
//-------------------------------------- 
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};
//--------------------------------------------------------------------------------------------------------------
exports.getAllUsers = async (req, res) => {
  try {
    console.log("Getting list of Users...")
    const users = await User.find({});
    const result = users.map((u) => {
      return u.username;
    });
    console.log(result)
    res.send({ allUsers: result });
    // res.send({ msg: "This came from getAllUsers" })
  } 
//-------------------------------------- 
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};
//--------------------------------------------------------------------------------------------------------------

exports.updateUser = async (req, res) => {
    try {                                                         
    console.log(req.body)            //?      <----      to check how data is being sent
    if (req.body.newUsername) {
      const user = await User.findOne({username: req.body.username})
      let oldName = req.body.username
      let newName = req.body.newUsername
      console.log(`Changing ${oldName} to ${newName}`)
      await User.updateOne({username: user.username}, {$set: {username: req.body.newUsername}});
      res.send({ msg: "Username Updated"})
    }
    //--------------------------------------------------------------------------
    else if (req.body.newEmail) {
      const user = await User.findOne({username: req.body.username})
      let oldName = req.body.username
      let newEmail = req.body.newEmail
      console.log(`Changing ${oldName}'s email address to ${newEmail}`)
      await User.updateOne({email: user.email}, {$set: {email: req.body.newEmail}});
      res.send({ msg: "E-Mail Updated"})
    }
    //--------------------------------------------------------------------------
    else if (req.body.newPassword) {
      const user = await User.findOne({username: req.body.username})
      let oldPass = req.body.password
      let newPass = req.body.newPassword
      console.log(`Updating Password`)
      await User.updateOne({password: user.password}, {$set: {password: req.body.newPassword}})
      res.send({ msg: "Password Updated"})
    }
    //---------------------------------------------------------------------------
    else {
      console.log("Else condition reached")
      throw new Error("No newUpdate field detected")
    }
  }  
  catch (error) {
    console.log(error)
    res.status(418).send({ error: error.message })
  }
}
//--------------------------------------------------------------------------------------------------------------
exports.deleteUser = async (req, res) => {
  try {
  console.log("Deleting a user...");
  await User.deleteOne({ username: req.body.username })
  res.send({ msg: "This came from deleteUser" });
  }
  //-------------------------------------- 
  catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
}
//--------------------------------------------------------------------------------------------------------------
exports.updateUser = async (req, res) => {
  try {                                            
  console.log(req.body)            //?      <----        to check how data is being sent
    const user = await User.findOne({username: req.body.username})
    // Finds username
    //-------------------------------------- 
    if (req.body.newUsername) {
      // If there is a new-something in the body, it'll update. If not, it will ignore it
      await User.updateOne({username: user.username}, {$set: {username: req.body.newUsername}});
      console.log("Username Updated")
    }
    else{
      console.log("Username NOT Updated")
    }
    //-------------------------------------- 
    if (req.body.newPassword) {
      await User.updateOne({password: user.password}, {$set: {password: req.body.newPassword}});
      console.log("Password Updated")
    }
    else{
      console.log("Password NOT Updated")
    }
    //-------------------------------------- 
    
    if (req.body.newEmail) {
      await User.updateOne({email: user.email}, {$set: {email: req.body.newEmail}});
      console.log("Email Updated")
    }
    else{
      console.log("Email NOT Updated")
    }
    console.log("Update User Ended")
    console.log(req.body)
    res.send({ msg: "User Update complete"})
    //-------------------------------------- 
  }
//-------------------------------------- 
  catch (error) {
    console.log(error)
    res.status(418).send({ error: error.message })
  }
}
//--------------------------------------------------------------------------------------------------------------
// exports.updatePass2 = async (req, res) => {
//   try {                                                        
//     if (req.body.newPassword){ 
//       // This is seoerate as it'll need to hash
//   console.log(req.body)            //? <----             to check how data is being sent
//   const user = await User.findOne({username: req.body.username})
//   await User.updateOne({username: user.password}, {$set: {password: req.body.newPassword}});
//   res.send({ msg: "User fields updated" })
//   console.log("Updated password")
//     }
//     else
//     {console.log("Not updated")}
// }
// //--------------------------------------
// catch (error) {
//   console.log(error)
//   res.status(418).send({ error: error.message })
// }
// }