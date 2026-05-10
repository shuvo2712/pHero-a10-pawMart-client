import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaImage, FaLock, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

const Register = () => {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;

    // Password Validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    login();
    toast.success("Account created successfully!");
    navigate("/");
  };

  const handleGoogleLogin = () => {
    login();
    toast.success("Account created with Google!");
    navigate("/");
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 my-10">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">Create Account</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full pl-12 rounded-xl focus:outline-primary"
                />
              </div>
            </div>

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
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30" />
                <input
                  name="photo"
                  type="url"
                  placeholder="Photo URL"
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

            <button type="submit" className="btn btn-primary w-full text-white rounded-xl mt-6 font-bold uppercase">
              Register
            </button>
          </form>

          <div className="divider text-xs text-base-content/30 my-6 uppercase font-bold tracking-widest">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center gap-3 rounded-xl border-base-300 hover:bg-base-200 hover:text-base-content font-semibold"
          >
            <FaGoogle className="text-error" /> Continue with Google
          </button>

          <p className="text-center mt-8 text-sm text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold link link-hover">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
