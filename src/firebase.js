import firebase from "firebase/compat/app"
import 'firebase/compat/database'
const firebaseConfig = {
  apiKey: "AIzaSyCgi_IliVcZysh6VvPzEWCWCAl-1jaP0GM",
  authDomain: "filter-2d94d.firebaseapp.com",
  databaseURL: "https://filter-2d94d-default-rtdb.firebaseio.com",
  projectId: "filter-2d94d",
  storageBucket: "filter-2d94d.appspot.com",
  messagingSenderId: "431265127948",
  appId: "1:431265127948:web:0dfb99a72bef55dafad829",
  measurementId: "G-SKHCPQGLFE"
};
firebase.initializeApp(firebaseConfig)
export const dataref = firebase.database()
export default firebase