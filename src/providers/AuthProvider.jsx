import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login
  const login = () => {
    setUser({
      name: "Mock User",
      email: "mockuser@example.com",
      photoURL: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
