import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/');
  };

  return (
    <div className="p-8 text-center max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <button onClick={handleLogin} className="btn btn-primary w-full">
        Login
      </button>
    </div>
  );
};

export default Login;
