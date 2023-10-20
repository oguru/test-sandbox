import "firebase/firestore";
import "firebase/installations";
import firebase from "firebase/app";

// export const firestore = firebase.firestore();

export const userName = () => firebase.auth().currentUser.displayName;

export const signOut = () => firebase.auth().signOut();

// export const checkAuth = ({uid, handleSuccess, handleFail}) => {
//    firestore
//       .collection("users")
//       .doc(uid)
//       .get()
//       .then(() => {
//          handleSuccess();
//       })
//       .catch(err => {
//          console.log("catch error: ", err);
//          handleFail(err);
//       });
// };
