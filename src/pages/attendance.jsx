import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { jsPDF } from "jspdf"; // Import jsPDF

export default function Attendance() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term
    const supabase = createClient('https://ejgafdxzkwtszuyruk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqZ2FmZHh6a253d3RzenV5cnVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMjIwNjUsImV4cCI6MjA0ODc5ODA2NX0.pWi3oivl7P3u7dqp7DQ3twLZ_sdCVmSg6AVrzjijr54');

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('startup')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting data:', error);
            } else {
                setOrders(orders.filter(order => order.id !== id));
            }
        } catch (error) {
            console.error('Unexpected error during deletion:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/EditStartUp/${id}`);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text("StartUp Table", 14, 20);

        let yPosition = 30;

        // Table Header
        doc.setFont("helvetica", "bold");
        doc.text("StartUp Name", 14, yPosition);
        doc.text("Principle Innovator", 60, yPosition);
        doc.text("Date Incorporated", 120, yPosition);
        doc.text("StartUp Stage", 160, yPosition);

        yPosition += 10;

        // Table rows
        doc.setFont("helvetica", "normal");
        orders.forEach(row => {
            doc.text(row.startupname, 14, yPosition);
            doc.text(row.FounderName, 60, yPosition);
            doc.text(row.DateIncoporated, 120, yPosition);
            doc.text(row.StartUpStage, 160, yPosition);
            yPosition += 10;
        });

        // Save PDF
        doc.save('startup_table.pdf');
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data, error } = await supabase
                    .from('startup')
                    .select('id, startupname, FounderName, DateIncoporated, StartUpStage');

                if (error) {
                    console.error('Error fetching data:', error);
                } else {
                    setOrders(data);
                }
            } catch (error) {
                console.error('Unexpected error during fetch:', error);
            }
        };

        fetchOrders();
    }, [supabase]);

    // Filtered data based on search term
    const filteredOrders = orders.filter(order =>
        order.startupname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='bg-black h-screen w-full px-10'>
            <div className='flex justify-between pt-5 mb-20'>
                 <h1 className="text-4xl font-extrabold text-center">
        <span className="text-white bg-black px-2">BE</span>{' '}
        <span className="text-red-600">THAT</span>{' '}
        <span className="text-white bg-black px-2">M</span>
        <span className="text-red-600">A</span>
        <span className="text-white bg-black px-2">N</span>
      </h1>
      
            </div>

            <div className='flex justify-between items-center mb-4'>
                <div className='flex space-x-6 text-sm'>
                   <div className='text-white cursor-pointer' onClick={() => navigate("/home")}>Home</div>
                    <div className='text-white cursor-pointer' onClick={() => navigate("/Class")}>Class</div>
                    <div className='text-white cursor-pointer' onClick={() => navigate("/Facilitator")}>Facilitators</div>
                    <div className='text-white cursor-pointer' onClick={() => navigate("/Cells")}>Cells</div>
                </div>
                <div onClick={() => navigate("/RegisterCells")} className='flex items-center space-x-2'>
                    <div className='text-white px-4 py-2 rounded-xl font-bold bg-red-500 cursor-pointer hover:bg-blue-600'>
                        Register New Man
                    </div>
                </div>
            </div>

            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search StartUp Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

 <div className="mt-4 mb-4">
                <button
                    onClick={downloadPDF}
                    className="text-white px-4 py-2 rounded-xl font-bold bg-red-600 cursor-pointer hover:bg-green-600"
                >
                    Download Table as PDF
                </button>
            </div>


            <div className='bg-white rounded-lg shadow-md p-6'>
                <table className="table-auto w-full border-collapse text-gray-700">
                    <thead>
                        <tr className='bg-red-600 text-white'>
                            <th className="px-4 py-2 text-left">Home</th>
                            <th className="px-4 py-2 text-left">Class</th>
                            <th className="px-4 py-2 text-left">Facilators</th>
                            <th className="px-4 py-2 text-left">Assignment</th>
                            <th className="px-4 py-2 text-left">Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((row, index) => (
                            <tr 
                                key={row.id} 
                                className={`${
                                    index % 2 === 0 ? 'bg-red-100' : 'bg-red-50'
                                } hover:bg-gray-300 transition-colors`}
                            >
                                <td className="px-4 py-2 border-b border-gray-300">{row.startupname}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{row.FounderName}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{row.DateIncoporated}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{row.StartUpStage}</td>
                                <td className="px-4 py-2 border-b border-gray-300 flex space-x-2">
                                    <button 
                                        onClick={() => handleEdit(row.id)}
                                    >
                                        <MdEdit />
                                    </button>
                                    <button 
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add the download button */}
           
        </div>
    );
}