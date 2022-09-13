import express from "express";
import {AddInvitationController} from "./adapter/in/controllers/AddInvitation-controller";
import {GetUserController} from "./adapter/in/controllers/GetUser-controller";
import {RemoveInvitationController} from "./adapter/in/controllers/RemoveInvitation-controller";
import {UpdateCanInviteController} from "./adapter/in/controllers/UpdateCanInvite-controller";

const router = express.Router();
const addInvitationController = new AddInvitationController();
const removeInvitationController = new RemoveInvitationController();
const getUserController = new GetUserController();
const updateCanInviteController = new UpdateCanInviteController();

router.use("/addInvitation", addInvitationController.addInvitation());
router.use("/removeInvitation", removeInvitationController.removeInvitation());
router.use("/getUser", getUserController.getUserByUid());
router.use("/getUser", getUserController.getUserById());
router.use("/updateCanInvite", updateCanInviteController.updateCanInvite());

export const userRoutes = router;