import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  useDocumentTitle("Login");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then(() => {
        toast.success("Successfully logged in!");
        navigate(location.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(location.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">Login to PawMart</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full pl-12 rounded-xl focus:outline-primary"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-12 rounded-xl focus:outline-primary"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full text-white rounded-xl mt-4 font-bold uppercase">
              Login
            </button>
          </form>

          <div className="divider text-xs text-base-content/30 my-6 uppercase font-bold tracking-widest">OR</div>

          {/* Google Login */}
          <button 
            onClick={handleGoogleLogin} 
            className="btn btn-outline w-full flex items-center gap-3 rounded-xl border-base-300 hover:bg-base-200 hover:text-base-content font-semibold"
          >
            <FaGoogle className="text-error" /> Continue with Google
          </button>

          <p className="text-center mt-8 text-sm text-base-content/60">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-bold link link-hover">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
