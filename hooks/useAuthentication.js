import React, {useState, useEffect} from 'react';
import { auth, onAuthStateChanged } from "../firebase/firebase";


export function useAuthentication() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
}