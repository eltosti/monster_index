import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDsixqFSeCvlG32C9RcJh_xR12U3y-5uaw",

  authDomain: "contador-c9ac2.firebaseapp.com",

  projectId: "contador-c9ac2",

  storageBucket: "contador-c9ac2.appspot.com",

  messagingSenderId: "245947252352",

  appId: "1:245947252352:web:ed5fe2229ec3108d127065",

  measurementId: "G-GEPGT5KCZM"

}


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export default db
