import React from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import { Tooltip } from 'react-tooltip'; 
import 'react-tooltip/dist/react-tooltip.css'; 

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Email login handler
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      setTimeout(() => navigate(from, { replace: true }), 300);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Google login handler
  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google!');
      setTimeout(() => navigate(from, { replace: true }), 300);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-base-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      <form onSubmit={handleEmailLogin} className="space-y-3">
        <input
          className="input input-bordered w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-tooltip-id="email-tip"
        />
        <Tooltip id="email-tip" place="right" content="Enter your registered email" />

        <input
          className="input input-bordered w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-tooltip-id="password-tip"
        />
        <Tooltip id="password-tip" place="right" content="Enter your account password" />


        {/* Forgot Password Text */}
        <div className="text-right">
          <span className="text-sm text-blue-500 hover:underline cursor-pointer">
            Forgot Password?
          </span>
        </div>


        <div className="flex justify-between items-center">
          <button
            className="btn btn-primary"
            type="submit"
            data-tooltip-id="login-btn-tip"
          >
            Login
          </button>
          <Tooltip id="login-btn-tip" place="top" content="Sign in using email and password" />

          <Link to="/register" className="link" data-tooltip-id="register-tip">
            Register
          </Link>
          <Tooltip id="register-tip" place="top" content="Create a new account" />
        </div>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogle}
        className="btn btn-outline btn-block"
        data-tooltip-id="google-tip"
      >
        Login with Google
      </button>
      <Tooltip id="google-tip" place="top" content="Sign in quickly using your Google account" />
    </div>
  );
}
