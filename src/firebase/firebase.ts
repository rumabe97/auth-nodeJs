import express from 'express';
import {SignupController} from "./adapter/in/controllers/Signup-controller";
import {initializeApp, cert} from 'firebase-admin/app';
import {initializeApp as f} from 'firebase/app'
import {LoginController} from "./adapter/in/controllers/login-controller";

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
const loginControlelr = new LoginController();

router.use("/signup", signupController.signup())
router.use("/login", loginControlelr.logIn())
export const firebaseRoutes = router;
