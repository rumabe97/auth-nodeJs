import {initializeApp, cert} from 'firebase-admin/app';
import {initializeApp as f} from 'firebase/app'

const GOOGLE_APPLICATION_CREDENTIALS = '/home/ruben/Escritorio/githubProyects/auth-nodeJs/serviceAccountKey.json';

export function initFirebaseModule(){
    initializeApp({
        credential: cert(GOOGLE_APPLICATION_CREDENTIALS),
        projectId: 'auth-twenti',
    })

    f({
        projectId: 'auth-twenti',
        apiKey: 'AIzaSyAbWekZeG7PZKGbpI3B4uHsyElxQjOxqeQ'
    })
}