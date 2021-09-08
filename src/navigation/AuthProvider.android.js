import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const trySignUp = () => {
    const db = firestore();

    if (db.collection('users').doc(auth().currentUser.uid) == null) {
      db.collection('users')
        .doc(auth().currentUser.uid)
        .set({
          fname: '',
          lname: '',
          email: auth().currentUser.email,
          createdAt: firestore.Timestamp.fromDate(new Date()),
          userImg: null,
        })
        //ensure we catch any errors at this stage to advise us if something does go wrong
        .catch(error => {
          console.log(
            'Something went wrong with added user to firestore: ',
            error,
          );
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(trySignUp());
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin: async callback => {
          try {
            // Get the users ID token
            const {idToken} = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            auth()
              .signInWithCredential(googleCredential)
              .then(trySignUp())
              .then(() => callback())
              .catch(error => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (error) {
            console.log({error});
          }
        },
        fbLogin: async callback => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
              'public_profile',
              'email',
            ]);

            if (result && result.isCancelled) {
              throw 'User cancelled the login process';
            } else if (result) {
              const res = await AccessToken.getCurrentAccessToken();
              if (!res) {
                throw 'Something went wrong obtaining access token';
              }
              console.log('accessToken', res.accessToken);
              const facebookCredential =
                await auth.FacebookAuthProvider.credential(res.accessToken);
              if (facebookCredential) {
                console.log('facebookCredential');
                auth()
                  .signInWithCredential(facebookCredential)
                  .then(trySignUp())
                  .then(() => callback());
              }
            }

            // Once signed in, get the users AccesToken
          } catch (error) {
            console.log({error});
          }
        },
        register: async (email, password, callback) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                //Once the user creation has happened successfully, we can add the currentUser into firestore
                //with the appropriate details.
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    fname: '',
                    lname: '',
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: null,
                  })
                  .then(() => callback())
                  //ensure we catch any errors at this stage to advise us if something does go wrong
                  .catch(error => {
                    console.log(
                      'Something went wrong with added user to firestore: ',
                      error,
                    );
                  });
              })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async callback => {
          try {
            await auth()
              .signOut()
              .then(() => callback());
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthContext, AuthProvider};
