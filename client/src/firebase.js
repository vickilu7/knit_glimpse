import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyAx1VrgRv8ipbg8Nqpar5yEvmpeWbcl-yk",
    authDomain: "knit-glimpse.firebaseapp.com",
    projectId: "knit-glimpse",
    storageBucket: "knit-glimpse.appspot.com",
    messagingSenderId: "720655220824",
    appId: "1:720655220824:web:fdffb1195d2fe8343eca2d"
});

export const auth = app.auth();
export default app;