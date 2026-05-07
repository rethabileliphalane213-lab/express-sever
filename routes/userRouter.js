const {Router}=require("express")
const userController=require("../controllers/userController")
const userRouter=Router()

userRouter.get("/",userController.userListGet)
userRouter.get("/create", userController.usersCreateGet);
userRouter.post("/create", userController.usersCreatePost);
userRouter.get("/:id/update", userController.usersUpdateGet);
userRouter.post("/:id/update", userController.usersUpdatePost);
userRouter.post("/:id/delete", userController.usersDeletePost);
userRouter.get("/search",userController.userSearchGet)
userRouter.get("/searchUser", (req, res) => {
    res.render("searchUser", {
        title: "Search User"
    });
});
module.exports=userRouter