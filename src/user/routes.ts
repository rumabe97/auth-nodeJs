import express from "express";
import {AddInvitationController} from "./adapter/in/controllers/AddInvitation-controller";
import {GetUserController} from "./adapter/in/controllers/GetUser-controller";

const router = express.Router();
const addInvitationController = new AddInvitationController();
const getUserController = new GetUserController();

router.use("/addInvitation", addInvitationController.addInvitation());
router.use("/getUser", getUserController.getUserByUid());
router.use("/getUser", getUserController.getUserById());

export const userRoutes = router;