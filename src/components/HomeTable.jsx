import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function HomeTable() {
    const [members, setMembers] = useState([]);

    const supabase = createClient(
        'https://piujxpkfbugfqpajrxck.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpdWp4cGtmYnVnZnFwYWpyeGNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2ODEzMzEsImV4cCI6MjA2NDI1NzMzMX0.z4trPeWaRuDqinhPEIgPbDLKyZewo2sgSHqWqZWdEdI'
    );

    useEffect(() => {
        const fetchMembers = async () => {
            const { data, error } = await supabase.from('2025class').select('*');
            if (error) {
                console.error('Error fetching members:', error);
            } else {
                setMembers(data);
            }
        };
        fetchMembers();
    }, [supabase]);

    return (
        <div className="w-full px-6 py-8 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">BTM Class Members</h2>
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="min-w-[1200px] w-full text-left text-sm text-gray-700 whitespace-nowrap">
                    <thead className="bg-red-600 text-white">
                        <tr>
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
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={member.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}>
                                <td className="px-4 py-2">{member.Name}</td>
                                <td className="px-4 py-2">{member.Surname}</td>
                                <td className="px-4 py-2">{member.Phone}</td>
                                <td className="px-4 py-2">{member.Email}</td>
                                <td className="px-4 py-2">{member.Address}</td>
                                <td className="px-4 py-2">{member.Church}</td>
                                <td className="px-4 py-2">{member.FOC}</td>
                                <td className="px-4 py-2">{member.Occupation}</td>
                                <td className="px-4 py-2">{member.BTM}</td>
                                <td className="px-4 py-2">{member.Majored}</td>
                                <td className="px-4 py-2">{member.Commissioned}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
