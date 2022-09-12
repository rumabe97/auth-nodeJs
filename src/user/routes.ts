import express from "express";
import {AddInvitationController} from "./adapter/in/controllers/AddInvitation-controller";

const router = express.Router();
const addInvitationController = new AddInvitationController();

router.use("/addInvitation", addInvitationController.addInvitation());

export const userRoutes = router;