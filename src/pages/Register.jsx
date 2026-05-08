import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = () => {
    login();
    navigate('/');
  };

  return (
    <div className="p-8 text-center max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4">Register</h2>
      <button onClick={handleRegister} className="btn btn-primary w-full">
        Register
      </button>
    </div>
  );
};

export default Register;
