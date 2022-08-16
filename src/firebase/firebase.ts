import express from 'express';
import {SignupController} from "./adapter/in/controllers/Signup-controller";
import {initializeApp, cert} from 'firebase-admin/app';
import {initializeApp as f} from 'firebase/app'
import {LoginController} from "./adapter/in/controllers/Login-controller";
import {GetUserController} from "./adapter/in/controllers/GetUser-controller";
import {UpdateUserController} from "./adapter/in/controllers/UpdateUser-controller";

const GOOGLE_APPLICATION_CREDENTIALS = '/home/ruben/Escritorio/githubProyects/auth-nodeJs/serviceAccountKey.json';

initializeApp({
    credential: cert(GOOGLE_APPLICATION_CREDENTIALS),
    projectId: 'auth-twenti',
})

f({
    projectId: 'auth-twenti',
    apiKey: 'AIzaSyAbWekZeG7PZKGbpI3B4uHsyElxQjOxqeQ'
})

const router = express.Router();
const signupController = new SignupController();
const loginController = new LoginController();
const getUserController = new GetUserController();
const updateUserController = new UpdateUserController();

router.use("/signup", signupController.signup());
router.use("/login", loginController.logIn());
router.use("/getUser", getUserController.getUserByUid());
router.use("/getUser", getUserController.getUserByEmail());
router.use("/getUser", getUserController.getUserByPhoneNumber());
router.use("/updateUser", updateUserController.updateUser());

export const firebaseRoutes = router;
