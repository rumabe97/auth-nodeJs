import {initializeApp} from 'firebase-admin/app';
import {initializeApp as f} from 'firebase/app';

import * as serviceAccount from "../../serviceAccountKey.json";
import {credential} from "firebase-admin";

export function initFirebaseModule() {
    initializeApp({
        credential: credential.cert(serviceAccount as any),
        projectId: 'auth-twenti',
    })

    f({
        projectId: 'auth-twenti',
        apiKey: 'AIzaSyAbWekZeG7PZKGbpI3B4uHsyElxQjOxqeQ'
    })
}