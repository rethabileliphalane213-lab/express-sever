
const userStorage=require("./storages/userStorage")


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
