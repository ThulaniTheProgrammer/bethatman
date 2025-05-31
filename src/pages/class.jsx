import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { MdDelete, MdEdit } from "react-icons/md";
import { jsPDF } from "jspdf";

export default function Class() {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const supabase = createClient(
        'https://piujxpkfbugfqpajrxck.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpdWp4cGtmYnVnZnFwYWpyeGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2ODEzMzEsImV4cCI6MjA2NDI1NzMzMX0.z4trPeWaRuDqinhPEIgPbDLKyZewo2sgSHqWqZWdEdI'
    );

    useEffect(() => {
        const fetchMembers = async () => {
            const { data, error } = await supabase.from('2025class').select('*');
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setMembers(data);
            }
        };
        fetchMembers();
    }, []);

    const handleDelete = async (id) => {
        const { error } = await supabase.from('2025class').delete().eq('id', id);
        if (!error) {
            setMembers(prev => prev.filter(member => member.id !== id));
        } else {
            console.error('Error deleting record:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/EditClassMember/${id}`);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("BTM Class Members", 14, 20);

        let y = 30;
        doc.text("Name", 14, y);
        doc.text("Surname", 40, y);
        doc.text("Phone", 70, y);
        doc.text("Email", 100, y);
        doc.text("Church", 140, y);
        doc.text("BTM", 170, y);
        y += 10;

        doc.setFont("helvetica", "normal");
        members.forEach(member => {
            doc.text(member.Name || '', 14, y);
            doc.text(member.Surname || '', 40, y);
            doc.text(String(member.Phone || ''), 70, y);
            doc.text(member.Email || '', 100, y);
            doc.text(member.Church || '', 140, y);
            doc.text(member.BTM || '', 170, y);
            y += 10;
        });

        doc.save("btm_class_members.pdf");
    };

    const filtered = members.filter(m =>
        `${m.Name} ${m.Surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='bg-black min-h-screen w-full px-10'>
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
                <div className='flex space-x-4'>
                    <button
                        onClick={() => navigate("/RegisterClass")}
                        className='text-white px-4 py-2 rounded-xl font-bold bg-red-500 cursor-pointer hover:bg-blue-600'>
                        Register New Member
                    </button>
                    <button
                        onClick={downloadPDF}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
                        Download PDF
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className='bg-white rounded-lg shadow-md p-6 overflow-x-auto'>
                <table className="min-w-[1200px] table-auto text-gray-700 whitespace-nowrap">
                    <thead>
                        <tr className='bg-red-600 text-white text-left'>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Surname</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Church</th>
                            <th className="px-4 py-2">FOC</th>
                            <th className="px-4 py-2">Occupation</th>
                            <th className="px-4 py-2">BTM</th>
                            <th className="px-4 py-2">Majored</th>
                            <th className="px-4 py-2">Commissioned</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((m, index) => (
                            <tr key={m.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                                <td className="px-4 py-2">{m.Name}</td>
                                <td className="px-4 py-2">{m.Surname}</td>
                                <td className="px-4 py-2">{m.Phone}</td>
                                <td className="px-4 py-2">{m.Email}</td>
                                <td className="px-4 py-2">{m.Address}</td>
                                <td className="px-4 py-2">{m.Church}</td>
                                <td className="px-4 py-2">{m.FOC}</td>
                                <td className="px-4 py-2">{m.Occupation}</td>
                                <td className="px-4 py-2">{m.BTM}</td>
                                <td className="px-4 py-2">{m.Majored}</td>
                                <td className="px-4 py-2">{m.Commissioned}</td>
                                <td className="px-4 py-2 flex space-x-2">
                                    <button onClick={() => handleEdit(m.id)} className="text-blue-600 hover:text-blue-800">
                                        <MdEdit />
                                    </button>
                                    <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:text-red-800">
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
