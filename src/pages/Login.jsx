import React from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleEmailLogin} className="space-y-3">
        <input className="input input-bordered w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="flex justify-between items-center">
          <button className="btn btn-primary" type="submit">Login</button>
          <Link to="/register" className="link">Register</Link>
        </div>
      </form>
      <div className="divider">OR</div>
      <button onClick={handleGoogle} className="btn btn-outline btn-block">Login with Google</button>
    </div>
  );
}
