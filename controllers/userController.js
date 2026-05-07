
const { render } = require("ejs")
const userStorage=require("../storages/userStorage")
const {body, validationResult, matchedData}=require("express-validator")
const { ValidatorsImpl } = require("express-validator/lib/chain")

const alphaError="Must only contain aplhabets"
const lengthError="must be between 1 to 10 characters"
const emailError="must be valid"
const numberError="must a Number"

const validateUser=[
    body("firstName")
    .trim()
    .isAlpha().withMessage(`first Name ${alphaError}`)
    .isLength({min:1,max:10}).withMessage(`Last Name ${lengthError}`),
    body("lastName").trim()
    .isAlpha().withMessage("Last Name ${alphaError}")
    .isLength({min:1,max:10}).withMessage(`Last Name ${lengthError}`),
    body("email").trim().isEmail().withMessage(emailError),
    body("age").trim().isNumeric().withMessage(numberError),
    body("bio").isLength({min:1,max:200}).withMessage("bio must be less than 200 characters")
]


exports.userListGet=(req,res)=>{
   res.render("index",{
    title:"User List",
    users:userStorage.getUsers()
   })
}

exports.usersCreateGet=(req,res)=>{
    res.render("createUser",{
        title:"Create user"
    })
}

exports.usersCreatePost=(req,res)=>{
    const {firstName,lastName,email,age,bio}=req.body
    userStorage.addUser({firstName,lastName,email,age,bio})
    res.redirect("/")
}

exports.usersUpdateGet=(req,res)=>{
   const user = userStorage.getUser(req.params.id);
    res.render("updateUser",{
        title:"Update user",
        user:user
    })
}
exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = userStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName,email,age,bio } = matchedData(req);
    userStorage.updateUser(req.params.id, { firstName, lastName,email,age,bio });
    res.redirect("/");
  }
];

exports.usersDeletePost = (req, res) => {
  userStorage.deleteUser(req.params.id);
  res.redirect("/");
};

exports.userSearchGet=(req,res)=>{
    const {firstName,email}=req.query
    const users=userStorage.searchUsers({firstName,email})
    res.render("search",{
      title:"Search Results",
      users 
    })
}