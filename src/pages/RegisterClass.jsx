import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

 const supabase = createClient('https://piujxpkfbugfqpajrxck.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpdWp4cGtmYnVnZnFwYWpyeGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2ODEzMzEsImV4cCI6MjA2NDI1NzMzMX0.z4trPeWaRuDqinhPEIgPbDLKyZewo2sgSHqWqZWdEdI');

export default function RegisterCells() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: '',
    Surname: '',
    Phone: '',
    Email: '',
    Address: '',
    Church: '',
    FOC: '',
    Occupation: '',
    BTM: '',
    Majored: '',
    Commissioned: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const { data, error } = await supabase
      .from('2025class')
      .insert([formData]);

    setLoading(false);
    if (error) {
      setErrorMsg('Something went wrong. Please try again.');
      console.error(error);
    } else {
      setSuccessMsg('Member registered successfully!');
      setFormData({
        Name: '',
        Surname: '',
        Phone: '',
        Email: '',
        Address: '',
        Church: '',
        FOC: '',
        Occupation: '',
        BTM: '',
        Majored: '',
        Commissioned: '',
      });
    }
  };

  return (
    <div className="min-h-screen pb-10 pt-10 bg-gradient-to-br from-black to-gray-900 flex flex-col justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register New Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block mb-1 font-medium text-gray-700">{key}</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                required
              />
            </div>
          ))}

          {errorMsg && <p className="text-red-600">{errorMsg}</p>}
          {successMsg && <p className="text-green-600">{successMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-red-600 hover:bg-green-600 transition rounded-lg font-bold"
          >
            {loading ? 'Registering...' : 'Register Member'}
          </button>
        </form>

        <button
          onClick={() => navigate("/Cells")}
          className="mt-6 w-full py-2 text-sm font-semibold text-gray-700 hover:underline"
        >
          ← Back to Cells Table
        </button>
      </div>
    </div>
  );
}
