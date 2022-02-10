import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: "AIzaSyADsHRdH3yOvlymqN4K1EE9YjgyBV8MdHo",
  authDomain: "greatplaces-c4f99.firebaseapp.com",
  projectId: "greatplaces-c4f99",
  storageBucket: "greatplaces-c4f99.appspot.com",
  messagingSenderId: "278703061128",
  appId: "1:278703061128:web:83560365b81d51b0cf073d"
};

let app

if(firebase.apps.length === 0)
{
  app = firebase.initializeApp(firebaseConfig);
}
else {
  app = firebase.app()
}

const db = app.firestore();
const auth= firebase.auth();
const storage = app.storage();




export {db, auth, storage};