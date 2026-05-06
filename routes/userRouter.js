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
module.exports=userRouter