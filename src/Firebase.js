import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4c4PHddGNkYJE4DypiCsRUHgSfuj3PS8",
  authDomain: "ticketswap-af628.firebaseapp.com",
  projectId: "ticketswap-af628",
  storageBucket: "ticketswap-af628.appspot.com",
  messagingSenderId: "1007129032800",
  appId: "1:1007129032800:web:a12eca076d30977481ab05"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;