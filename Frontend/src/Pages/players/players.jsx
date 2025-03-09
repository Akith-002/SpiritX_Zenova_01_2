import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './players.module.css';
import { Search, Filter } from 'lucide-react';

const Players = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const roles = ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'];
  const universities = ['University A', 'University B', 'University C'];

  return (
    <div className={styles.container1}>
      <div className={styles.left}>
        <Navbar />
      </div>
      <div className={styles.right}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Players</h1>
            <p className={styles.subtitle}>Browse and analyze player statistics</p>
          </div>

          <div className={styles.filters}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} size={25} />
              <input
                type="text"
                placeholder="Search players..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className={styles.dropdownContainer}>
              <div className={styles.dropdown}>
                <button className={styles.dropdownButton} onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}>
                  <Filter size={20} />
                  <span>Role</span>
                  <span className={styles.chevron}>▼</span>
                </button>
                {isRoleDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {roles.map((role) => (
                      <div
                        key={role}
                        className={styles.dropdownItem}
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

              <div className={styles.dropdown}>
                <button
                  className={styles.dropdownButton}
                  onClick={() => setIsUniversityDropdownOpen(!isUniversityDropdownOpen)}
                >
                  <Filter size={20} />
                  <span>University</span>
                  <span className={styles.chevron}>▼</span>
                </button>
                {isUniversityDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {universities.map((university) => (
                      <div
                        key={university}
                        className={styles.dropdownItem}
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
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Players;