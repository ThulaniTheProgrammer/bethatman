import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      setEmail('');
      setPassword('');
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials or account does not exist. Please sign up.');
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <h1 className="text-4xl font-extrabold mb-2 text-center">
        <span className="text-white bg-black px-2">BE</span>{' '}
        <span className="text-red-600">THAT</span>{' '}
        <span className="text-white bg-black px-2">M</span>
        <span className="text-red-600">A</span>
        <span className="text-white bg-black px-2">N</span>
      </h1>

      <div className="w-screen px-4">
        <hr className="border-red-600 mb-1" />
      </div>

      <div className="flex items-center space-x-3 mb-8">
        <p className="text-gray-300">Don't have an account?</p>
        <button
          onClick={goToSignUp}
          className="text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition duration-200"
          type="button"
        >
          Create Account
        </button>
      </div>

      <div className="bg-gray-900 p-10 rounded-xl shadow-md w-full max-w-md">
        <form onSubmit={handleSignIn} className="space-y-8">
          <input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 text-lg border-2 border-red-500 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 text-lg border-2 border-red-500 rounded-lg bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3 rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
