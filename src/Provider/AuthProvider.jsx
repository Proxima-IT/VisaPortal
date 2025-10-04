import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // register with email & password
  const handleRegister = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login with email & password
  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update profile
  const handleUpdateProfile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  // handle logout
  const handleLogout = () => {
    return signOut(auth);
  };

  // setting up an observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  });

  const userInfo = {
    handleRegister,
    handleUpdateProfile,
    handleLogin,
    handleLogout,
    user,
    setUser,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
