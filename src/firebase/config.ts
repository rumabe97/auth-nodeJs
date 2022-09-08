import {initializeApp, applicationDefault} from 'firebase-admin/app';
import {initializeApp as f} from 'firebase/app';

export function initFirebaseModule(){
    initializeApp({
        credential: applicationDefault(),
        projectId: 'auth-twenti',
    })

    f({
        projectId: 'auth-twenti',
        apiKey: 'AIzaSyAbWekZeG7PZKGbpI3B4uHsyElxQjOxqeQ'
    })
}