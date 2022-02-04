import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux"
import AuthNavigation from "../navigation/AuthNavigation"
import PlacesStack from '../navigation/PlacesStack';

export default function RootNavigation() {

  const isAuth = useSelector(state => !!state.auth.token) 
  const [user, setUser] = useState(false)
  
  useEffect(() => {
    console.log("isAuth", isAuth)
    if(isAuth){
        setUser(true)
    } else {
      setUser(false)
    }
}, [isAuth]);


  return user ? <PlacesStack /> : <AuthNavigation />;
}