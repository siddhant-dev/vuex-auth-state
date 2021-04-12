import firebase from 'firebase'; 
import env from './config'
// import auth from 'firebase/auth';

firebase.initializeApp(env.firebaseConfig);

export default firebase;
