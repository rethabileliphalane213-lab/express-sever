const {Router}=require("express")
const userController=require("../controllers/userController")
const userRouter=Router()

userRouter.get("/",userController.usersLISTget)
userRouter.get("/create", userController.usersCreateGet);
userRouter.post("/create", userController.usersCreatePost);

module.export=userRouter