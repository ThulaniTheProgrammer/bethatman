import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { AiFillSignal } from "react-icons/ai";
import HomeTable from './HomeTable';

export default function Home() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

   useEffect(() => {
         const fetchOrders = async () => {
             const supabase = createClient('https://ejgafdxzknwwzuyruk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqZ2FmZHh6a253d3RzenV5cnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMjIwNjUsImV4cCI6MjA0ODc5ODA2NX0.pWi3oivl7P3u7dqp7DQ3twLZ_sdCVmSg6AVrzjijr54');
 
             const { data, error } = await supabase
                 .from('Ip')
                 .select('IpName, Innovator, DateFiled, DateReceived, Draft');
 
             if (error) {
                 console.error('Error fetching IP data:', error);
             } else {
                 setOrders(data);
             }
         };
 
         fetchOrders();
     }, []);
 

  return (
    <div className="bg-black  min-h-screen p-8">
      {/* Header */}
      <div className="flex  items-center flex-col w-full  mb-1">
         <h1 className="text-4xl font-extrabold text-center">
        <span className="text-white bg-black px-2">BE</span>{' '}
        <span className="text-red-600">THAT</span>{' '}
        <span className="text-white bg-black px-2">M</span>
        <span className="text-red-600">A</span>
        <span className="text-white bg-black px-2">N</span>
      </h1>
      
      </div>
 <div className="w-screen px-4">
        <hr className="border-red-600 mb-10" />
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-40  bg-red-800 text-white rounded-lg p-6 mr-6">
          <nav className="space-y-6">
            <div className="cursor-pointer hover:text-black" onClick={() => navigate('/home')}>Home</div>
            <div className="cursor-pointer hover:text-black" onClick={() => navigate('/Class')}>Class</div>
            <div className="cursor-pointer hover:text-black" onClick={() => navigate('/Facililator')}>Facilitators</div>
            <div className="cursor-pointer hover:text-black" onClick={() => navigate('/Cells')}>Cells</div>
               <div className="cursor-pointer hover:text-black" onClick={() => navigate('/Assignment')}>Assignment</div>
                  <div className="cursor-pointer hover:text-black" onClick={() => navigate('/Attendance')}>Attendance</div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-3/4 bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-black text-white rounded-lg p-4 shadow-md cursor-pointer" onClick={() => navigate('/Class')}>
              <h2 className="text-xl font-bold">Registered Man</h2>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold">00</p>
                <AiFillSignal size={24} className="text-red-300" />
              </div>
            </div>

            <div className="bg-black text-white rounded-lg p-4 shadow-md cursor-pointer" onClick={() => navigate('/Facilitator')}>
              <h2 className="text-xl font-bold">Registered Facilitators</h2>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold">00</p>
                <AiFillSignal size={24} className="text-red-300" />
              </div>
            </div>

            <div className="bg-black text-white rounded-lg p-4 shadow-md cursor-pointer" onClick={() => navigate('/Cells')}>
              <h2 className="text-xl font-bold">Registered Cells</h2>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold">5</p>
                <AiFillSignal size={24} className="text-red-300" />
              </div>
            </div>

            <div className="bg-black text-white rounded-lg p-4 shadow-md cursor-pointer" onClick={() => navigate('/Assignment')}>
              <h2 className="text-xl font-bold">Assignments</h2>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold"></p>
                <AiFillSignal size={24} className="text-red-300" />
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="">
         
<HomeTable/>



          </div>
        </div>
      </div>
    </div>
  );
}