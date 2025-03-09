import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Search, Filter } from 'lucide-react';

const NewPlayers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  const roles = ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'];
  const universities = ['University Of Moratuwa', 'University of Ruhuna', 'University Colombo'];

  // Sample player data
  const players = [
    {
      name: 'John Doe',
      university: 'University Of Moratuwa',
      role: 'Batsman',
      matches: 45,
      runs: 1200,
      wickets: 5,
      average: 30.0,
      price: 50000,
    },
    {
      name: 'Jane Smith',
      university: 'University of Ruhuna',
      role: 'Bowler',
      matches: 50,
      runs: 300,
      wickets: 60,
      average: 25.4,
      price: 60000,
    },
    {
      name: 'Michael Clark',
      university: 'University Colombo',
      role: 'All-rounder',
      matches: 60,
      runs: 850,
      wickets: 40,
      average: 28.5,
      price: 70000,
    },
    {
      name: 'Samantha James',
      university: 'University Of Moratuwa',
      role: 'Wicketkeeper',
      matches: 35,
      runs: 800,
      wickets: 2,
      average: 26.5,
      price: 45000,
    },
    {
      name: 'Robert Lee',
      university: 'University Colombo',
      role: 'Bowler',
      matches: 60,
      runs: 200,
      wickets: 70,
      average: 22.3,
      price: 65000,
    },
    {
      name: 'Emma Wilson',
      university: 'University of Ruhuna',
      role: 'All-rounder',
      matches: 55,
      runs: 950,
      wickets: 55,
      average: 30.2,
      price: 75000,
    },
  ];

  return (
    <div className="flex">
      <div className="w-64 bg-[#2D336B] min-h-screen text-white">
        <Navbar />
      </div>
      <div className="flex-1 bg-[#F4F6FF] p-8">
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#2D336B]">Players</h1>
            <p className="text-[#7886C7]">Browse and analyze player statistics</p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex items-center space-x-6 mb-6">
            {/* Search Bar */}
            <div className="flex items-center space-x-2 border p-3 rounded-lg w-full max-w-md bg-white shadow-md">
              <Search size={25} className="text-[#2D336B]" />
              <input
                type="text"
                placeholder="Search players..."
                className="w-full bg-transparent outline-none text-[#2D336B] placeholder-[#7886C7]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Role Filter */}
            <div className="relative w-36">
              <button
                className="flex items-center space-x-2 p-10 bg-white border border-[#A9B5DF] rounded-lg shadow-md"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              >
                <Filter size={20} className="text-[-[#2D336Brgb(164, 165, 177)]" />
                <span className="text-[#2D336Brgb(164, 165, 177)]">Role</span>
                <span className="text-[#A9B5DF]">▼</span>
              </button>
              {isRoleDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#A9B5DF] rounded-lg shadow-md">
                  {roles.map((role) => (
                    <div
                      key={role}
                      className="p-3 cursor-pointer hover:bg-[#E6F1FF]"
                      onClick={() => {
                        setSelectedRole(role);
                        setIsRoleDropdownOpen(false);
                      }}
                    >
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* University Filter */}
            <div className="relative w-36">
              <button
                className="flex items-center space-x-2 p-3 bg-white border border-[#A9B5DF] rounded-lg shadow-md"
                onClick={() => setIsUniversityDropdownOpen(!isUniversityDropdownOpen)}
              >
                <Filter size={20} className="text-[-[#2D336Brgb(164, 165, 177)]" />
                <span className="text-[-[#2D336Brgb(164, 165, 177)]">University</span>
                <span className="text-[#A9B5DF]">▼</span>
              </button>
              {isUniversityDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#A9B5DF] rounded-lg shadow-md">
                  {universities.map((university) => (
                    <div
                      key={university}
                      className="p-3 cursor-pointer hover:bg-[#E6F1FF]"
                      onClick={() => {
                        setSelectedUniversity(university);
                        setIsUniversityDropdownOpen(false);
                      }}
                    >
                      {university}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Players Table */}
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#2D336B] text-white">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">University</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Matches</th>
                  <th className="px-6 py-3">Runs</th>
                  <th className="px-6 py-3">Wickets</th>
                  <th className="px-6 py-3">Average</th>
                  <th className="px-6 py-3">Price (Rs.)</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {players
                  .filter((player) =>
                    player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (selectedRole ? player.role === selectedRole : true) &&
                    (selectedUniversity ? player.university === selectedUniversity : true)
                  )
                  .map((player, index) => (
                    <tr key={index} className="border-b hover:bg-[#F4F6FF]">
                      <td className="px-6 py-4 text-[#2D336B]">{player.name}</td>
                      <td className="px-6 py-4 text-[#7886C7]">{player.university}</td>
                      <td className="px-6 py-4 text-[#2D336B]">{player.role}</td>
                      <td className="px-6 py-4 text-[#2D336B]">{player.matches}</td>
                      <td className="px-6 py-4 text-[#2D336B]">{player.runs}</td>
                      <td className="px-6 py-4 text-[#2D336B]">{player.wickets}</td>
                      <td className="px-6 py-4 text-[#2D336B]">{player.average}</td>
                      <td className="px-6 py-4 text-[#2D336B]">{player.price}</td>
                      <td className="px-6 py-4">
                        <button className="bg-[#2D336B] text-white px-4 py-2 m rounded-lg hover:bg-[#7886C7]">
                         +Add
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPlayers;
