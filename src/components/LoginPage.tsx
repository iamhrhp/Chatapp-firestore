import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import google from '../images/google.png';
import github from '../images/github.png';
import { db } from '../firebase/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { uid } from 'uid';
import { useNavigate } from 'react-router-dom';
// -----firebaseStiorage------
import { storage } from '../firebase/FirebaseConfig';
import { ref, uploadString } from 'firebase/storage';

const LoginPage = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const id = uid();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log('user------', user);
        if (user) {
          addData(user);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const addData = async (user: any) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        name: user.displayName.toLowerCase().replace(' ', '-'),
        id: id,
      });
      // ----------upload profile image-------
      // let photo = user.photoURL;
      // console.log('photo--------', photo);
      // const storageRef = ref(storage, '/images');
      // const uploadTask = uploadString(storageRef, photo);

      // -----------------------------------

      localStorage.setItem(
        'uname',
        user.displayName.toLowerCase().replace(' ', '-')
      );
      localStorage.setItem('uid', id);
      navigate('/chat');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Box sx={{ mt: '200px' }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography>Sign In With</Typography>
        <Button onClick={googleLogin}>
          <Box sx={{ width: '100%' }}>
            <img src={google} style={{ width: '30px' }} />
          </Box>
        </Button>
        <Button>
          <Box sx={{ width: '100%' }}>
            <img src={github} style={{ width: '30px' }} />
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
