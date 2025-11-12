import React from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  // Password validation
  const validatePassword = (pw) => {
    if (pw.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(pw)) return 'Must include at least one uppercase';
    if (!/[a-z]/.test(pw)) return 'Must include at least one lowercase';
    return '';
  };

  //Register with Email & Password
  const handleRegister = async (e) => {
    e.preventDefault();
    const err = validatePassword(password);
    if (err) return toast.error(err);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name, photoURL: photo });
      toast.success(' Registered successfully!');
      setTimeout(() => navigate('/'), 600); 
    } catch (err) {
      toast.error( + err.message);
    }
  };

  //  Register with Google
  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success(' Registered via Google!');
      setTimeout(() => navigate('/'), 600);
    } catch (err) {
      toast.error( + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-base-200 relative">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

      <form onSubmit={handleRegister} className="space-y-3">
        <input
          className="input input-bordered w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-tooltip-id="name-tip"
        />
        <Tooltip id="name-tip" place="right" content="Enter your full name" style={{ position: 'fixed' }} />

        <input
          className="input input-bordered w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-tooltip-id="email-tip"
        />
        <Tooltip id="email-tip" place="right" content="Enter a valid email address" style={{ position: 'fixed' }} />

        <input
          className="input input-bordered w-full"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          data-tooltip-id="photo-tip"
        />
        <Tooltip id="photo-tip" place="right" content="Paste a direct image link for your profile photo" style={{ position: 'fixed' }} />

        <input
          className="input input-bordered w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-tooltip-id="password-tip"
        />
        <Tooltip
          id="password-tip"
          place="right"
          content="Password must have 6+ chars, 1 uppercase & 1 lowercase"
          style={{ position: 'fixed' }}
        />

        
        <div className="flex justify-between items-center">
          <button
            className="btn btn-primary"
            type="submit"
            data-tooltip-id="register-btn-tip"
          >
            Register
          </button>
          <Tooltip
            id="register-btn-tip"
            place="top"
            content="Create your account"
            style={{ position: 'fixed', zIndex: 9999 }}
          />

          <Link
            to="/login"
            className="link"
            data-tooltip-id="login-link-tip"
          >
            Login
          </Link>
          <Tooltip
            id="login-link-tip"
            place="top"
            content="Already have an account? Log in"
            style={{ position: 'fixed', zIndex: 9999 }}
          />
        </div>
      </form>

      <div className="divider">OR</div>

      <button
        className="btn btn-outline btn-block"
        onClick={handleGoogle}
        data-tooltip-id="google-btn-tip"
      >
        Register with Google
      </button>
      <Tooltip
        id="google-btn-tip"
        place="top"
        content="Sign up quickly using your Google account"
        style={{ position: 'fixed', zIndex: 9999 }}
      />
    </div>
  );
}
