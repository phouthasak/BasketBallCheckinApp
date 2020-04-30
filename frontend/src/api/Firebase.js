import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAYOt8QLgO14uErW6Z08ZPRH7XtBNsMR4Y",
  authDomain: "basketballcheckin.firebaseapp.com",
  databaseURL: "https://basketballcheckin.firebaseio.com",
  projectId: "basketballcheckin",
  storageBucket: "basketballcheckin.appspot.com",
  messagingSenderId: "923554334708",
  appId: "1:923554334708:web:ca34ae7a026675c7389ba1",
  measurementId: "G-X8MCVKPH61"
};

firebase.initializeApp(config);
export default firebase;