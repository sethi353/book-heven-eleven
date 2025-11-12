import React from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const validatePassword = (pw) => {
    if (pw.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(pw)) return 'Must include at least one uppercase';
    if (!/[a-z]/.test(pw)) return 'Must include at least one lowercase';
    return '';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const err = validatePassword(password);
    if (err) return toast.error(err);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name, photoURL: photo });
      toast.success('Registered');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Registered via Google');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-3">
        <input className="input input-bordered w-full" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Photo URL" value={photo} onChange={e=>setPhoto(e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="flex justify-between items-center">
          <button className="btn btn-primary" type="submit">Register</button>
          <Link to="/login" className="link">Login</Link>
        </div>
      </form>
      <div className="divider">OR</div>
      <button className="btn btn-outline btn-block" onClick={handleGoogle}>Register with Google</button>
    </div>
  );
}
