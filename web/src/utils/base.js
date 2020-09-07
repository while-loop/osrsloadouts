import firebase from 'firebase/app';
import 'firebase/auth';
import axios from "axios";
import {toast} from "react-toastify";

export const BASE_URL = process.env.REACT_APP_API_URL;

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export let tokenRes = null;

export function currentUser() {
    return app.auth().currentUser
}


axios.interceptors.request.use(async config => {
    if (config.url.includes(process.env.REACT_APP_API_URL)) {
        if (tokenRes == null || (new Date(tokenRes.expirationTime) - new Date() <= 0)) {
            tokenRes = await idToken(true);
        }

        if (tokenRes != null) { // user might not be logged in
            config.headers.Authorization = tokenRes.token;
        }
    }
    return config;
});

export function refreshToken(force = false) {
    currentUser().getIdTokenResult(force).then(result => {
        tokenRes = result;
    }).catch(reason => {
        console.log("failed to get id token", reason);
        toast.error("Failed to get auth token: " + reason.toString());
    });
}

export async function idToken(force = false) {
    let user = currentUser();
    if (user == null) {
        return null;
    }

    return await user.getIdTokenResult(force);
}

export default app;
