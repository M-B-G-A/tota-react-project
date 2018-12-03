import firebase from "firebase/app";
import "firebase/storage";

const devConfig = {
  apiKey: "AIzaSyBDunpTmNF_AQFRFvrgWKu3WoXoC_upqGo",
  authDomain: "tota-b3f34.firebaseapp.com",
  databaseURL: "https://tota-b3f34.firebaseio.com",
  projectId: "tota-b3f34",
  storageBucket: "tota-b3f34.appspot.com",
  messagingSenderId: "422808423045"
};

const prodConfig = {
  apiKey: "AIzaSyBDunpTmNF_AQFRFvrgWKu3WoXoC_upqGo",
  authDomain: "tota-b3f34.firebaseapp.com",
  databaseURL: "https://tota-b3f34.firebaseio.com",
  projectId: "tota-b3f34",
  storageBucket: "tota-b3f34.appspot.com",
  messagingSenderId: "422808423045"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const storage = firebase.storage();

export { storage };
