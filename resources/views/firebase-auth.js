// Import the Firebase SDK and initialize it with your project credentials
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
};

firebase.initializeApp(config);

// Configure the Firebase Authentication service to use phone number authentication
const auth = firebase.auth();
auth.useDeviceLanguage();
auth.settings.appVerificationDisabledForTesting = true;

export default auth;
