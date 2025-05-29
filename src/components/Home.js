import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you can add logout logic like clearing tokens/session, then:
    navigate('/login'); // redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center">
        <span className="text-white bg-black px-3">BE</span>{' '}
        <span className="text-red-600">THAT</span>{' '}
        <span className="text-white bg-black px-3">M</span>
        <span className="text-red-600">A</span> 
        <span className="text-white bg-black px-3">N</span>
      </h1>
      
      <p className="text-xl mb-8 text-center max-w-md">
        Welcome to your personal dashboard. Here’s to being that man you aspire to be!
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg transition duration-200"
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
