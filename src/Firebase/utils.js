import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });

export const handleUserProfile = async (userAuth, additionalData) => {
  //ean den iparxei o user return
  if (!userAuth) return;

  //kanw destructure to uid apo to firebase.firestore
  const { uid } = userAuth;

  //elenxw ena uparxei to uid tis firestore database mesa sto collection users
  const userRef = firestore.doc(`users/${uid}`);

  //dhmiourgw ena snapshot ean uparxei o user stin vasi
  const snapshot = await userRef.get();

  //ean o xristis den einai sti database dhmiourgw enan apo to userAuth Object
  //me ta 3 parakatw xaraktiristika
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData,
      });
    } catch (err) {
      console.log(err);
    }
  }
  //kai epistrefw olo to userRef gia na kanw update to state tou app
  return userRef;
};
