import * as firebase from "firebase/app";
import 'firebase/auth';

// Firebase config with values defined in the application .env.
const config = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
};

/**
 * Initialize firebase for the application and use it to provide methods to sign in and out using the google
 * authentication provider.
 */
export default class Firebase {
    constructor() {
        this.firebase = firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        this.error = null;
    }

    /**
     * Call an async api method for and set the error state on failure.
     *
     * @param request The api call to the firebase
     */
    callFirebase = async (request) => {
        try {
            return await request();
        } catch(error) {
            this.error = error;
        }
    };

    /**
     * Use the Google Auth Provider to sign in to firebase
     */
    googleSignIn = async () => await this.callFirebase(this.auth.signInWithPopup(this.googleAuthProvider));

    /**
     * Sign out of firebase
     */
    signOut = async () => await this.callFirebase(this.auth.signOut());
}