
const userStorage=require("../storages/userStorage")
const {body, validationResult, matchedData}=require(express-validator)

const alphaError="Must only contain aplhabets"
const lengthError="must be between 1 to 10 characters"

const validateUser=[
    body("firstName")
    .trim()
    .isAlpha().withMessage(`first Name ${alphaError}`)
    .isLength({min:1,max:10}).withMessage(`Last Name ${lengthError}`),
    body("lastName").trim()
    .isAlpha().withMessage("Last Name ${alphaError}")
    .isLength({min:1,max10}).withMessage(`Last Name ${lengthError}`)
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
    const {firstName,lastName}=req.body
    userStorage.addUser({firstName,lastName})
    res.redirect("/")
}
