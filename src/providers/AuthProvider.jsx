import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login
  const login = () => {
    setUser({
      name: "",
      email: "",
      photoURL: ""
    });
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  const authInfo = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
