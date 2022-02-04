import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth, db} from "../../firebase/firebase"

export const SIGNUP = "SIGNUP"
export const LOGIN = "LOGIN"
export const AUTHENTICATE = "AUTHENTICATE"
export const LOGOUT = "LOGOUT"

let timer;


export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({type: AUTHENTICATE, userId: userId, token: token})
    }
}


export const signup = (email, password) => {
    let user;
    return async dispatch => {
    try {
     await auth.createUserWithEmailAndPassword(email, password)
     .then(() => {
         user = auth.currentUser
         db.collection('users').doc(auth.currentUser.uid)
         .set({
             fname: 'Tina',
             lname: 'Irgendwas',
             email: email,
             userImg: null,
             about: "",
             phone: "",
             country: "Denmark",
             city: "",
             })
         }) 
    } catch(error) {
         throw new Error(error)
     }  

        console.log("user", user.uid)
        console.log("user", user.accesToken)
    
        dispatch({type: SIGNUP, token: user.accesToken, userId: user.uid})
        dispatch({type: AUTHENTICATE, userId: user.uid, token: user.accesToken, expiryTime: parseInt(user.expirationTime) * 1000})
        const expirationDate = new Date(new Date().getTime() + parseInt(user.expirationTime) * 1000) // resData.expiresIn string with seconds
        saveDataToStorage(user.accesToken, user.uid, expirationDate)
    }
};

export const login = (email, password) => {
    return async dispatch => {
        let user;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            user = auth.currentUser
          } catch (error) {
            console.log("error = ", error)
            throw new Error(error);
          }
          

        console.log("login oplysninger : ", user.uid)
        let user1 = user.toJSON()
        console.log("accesToken", user1.stsTokenManager.accessToken)
        console.log("expTime", user1.stsTokenManager.expirationTime)

        dispatch({type: LOGIN, token: user1.stsTokenManager.accessToken, userId: user.uid});
        dispatch({type: AUTHENTICATE, userId: user.uid, token: user1.stsTokenManager.accessToken, expiryTime: parseInt(user1.stsTokenManager.expirationTime) * 1000})
        const expirationDate = new Date(new Date().getTime() + parseInt(user1.stsTokenManager.expirationTime) * 1000) // resData.expiresIn string with seconds
        saveDataToStorage(user1.stsTokenManager.accessToken, user.uid, expirationDate)
    }
};

export const logout = () => {
    return async dispatch => { 
    clearLogoutTimer();
    AsyncStorage.removeItem("userData");
    try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
        throw new Error(error)
      }
    dispatch({type: LOGOUT})
    }
}

const clearLogoutTimer = () => {
    if(timer) {
        clearTimeout(timer); 
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
       timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime / 1000);
    };
    
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }));
};