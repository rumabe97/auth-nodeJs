import express from 'express';
import {SignupController} from "./adapter/in/controllers/Signup-controller";
import {initializeApp, cert} from 'firebase-admin/app';

const GOOGLE_APPLICATION_CREDENTIALS = '/home/ruben/Escritorio/githubProyects/auth-nodeJs/serviceAccountKey.json';

initializeApp({
    credential: cert(GOOGLE_APPLICATION_CREDENTIALS),
    projectId: 'auth-twenti',
})


const router = express.Router();
const signupController = new SignupController();

router.use("/signup", signupController.signup())
export const firebaseRoutes = router;
