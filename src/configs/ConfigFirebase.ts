import {initializeApp} from 'firebase-admin/app';
import {initializeApp as f} from 'firebase/app';

import * as serviceAccount from "../../serviceAccountKey.json";
import {credential} from "firebase-admin";

export function initFirebaseModule(projectId: string, apiKey: string) {
    initializeApp({
        credential: credential.cert(serviceAccount as any),
        projectId: projectId,
    })

    f({
        projectId: projectId,
        apiKey: apiKey
    })
}