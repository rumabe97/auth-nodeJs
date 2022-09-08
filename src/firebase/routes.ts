import express from "express";
import {SignupController} from "./adapter/in/controllers/Signup-controller";
import {LoginController} from "./adapter/in/controllers/Login-controller";
import {GetUserController} from "./adapter/in/controllers/GetUser-controller";
import {UpdateUserController} from "./adapter/in/controllers/UpdateUser-controller";
import {DeleteUserController} from "./adapter/in/controllers/DeleteUser-controller";

const router = express.Router();
const signupController = new SignupController();
const loginController = new LoginController();
const getUserController = new GetUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

router.use("/signUp", signupController.signup());
router.use("/logIn", loginController.logIn());
router.use("/getUser", getUserController.getUserByUid());
router.use("/getUser", getUserController.getUserByEmail());
router.use("/getUser", getUserController.getUserByPhoneNumber());
router.use("/updateUser", updateUserController.updateUser());
router.use("/deleteUser", deleteUserController.deleteUser());

export const firebaseRoutes = router;