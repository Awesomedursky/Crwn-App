import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
const config = {
  apiKey:
    'AIzaSyBlMwnZ-MpsI24q7WTQ_pNBDYIxgjMxppA',
  authDomain: 'crwn-app-dc8af.firebaseapp.com',
  projectId: 'crwn-app-dc8af',
  storageBucket: 'crwn-app-dc8af.appspot.com',
  messagingSenderId: '331991906268',
  appId:
    '1:331991906268:web:4dabc0b007278e5fe68119',
  measurementId: 'G-51MB1HJV7F',
};

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(
      auth,
      googleProvider
    );
    const user = res.user;
    const q = query(
      collection(db, 'users'),
      where('uid', '==', user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        createdAt: new Date(),
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//registering with email and password
const registerWithEmailAndPassword = async (
  name,
  email,
  password
) => {
  try {
    const res =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// sign in with email and password
const logInWithEmailAndPassword = async (
  email,
  password
) => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
};
