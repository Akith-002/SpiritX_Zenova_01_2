import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./players.module.css";
import { Search, Filter } from "lucide-react";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isUniversityDropdownOpen, setIsUniversityDropdownOpen] =
    useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const roles = ["Batsman", "Bowler", "All-rounder", "Wicketkeeper"];
  const universities = ["University A", "University B", "University C"];

  // Fetch all players on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/players");

        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }

        const data = await response.json();
        setPlayers(data);

        // Extract unique universities from the data for the dropdown
        const uniqueUniversities = [
          ...new Set(data.map((player) => player.university)),
        ];
        if (uniqueUniversities.length > 0) {
          // Update universities array if data is available
          // universities = uniqueUniversities;
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Filter players based on search term, role, and university
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole ? player.category === selectedRole : true;
    const matchesUniversity = selectedUniversity
      ? player.university === selectedUniversity
      : true;

    return matchesSearch && matchesRole && matchesUniversity;
  });

  // Calculate batting average
  const calculateBattingAverage = (runs, innings) => {
    if (!innings || innings === 0) return 0;
    return (runs / innings).toFixed(2);
  };

  // Calculate bowling average
  const calculateBowlingAverage = (runsConceded, wickets) => {
    if (!wickets || wickets === 0) return 0;
    return (runsConceded / wickets).toFixed(2);
  };

  // Calculate strike rate
  const calculateStrikeRate = (runs, ballsFaced) => {
    if (!ballsFaced || ballsFaced === 0) return 0;
    return ((runs / ballsFaced) * 100).toFixed(2);
  };

  return (
    <div className={styles.container1}>
      <div className={styles.left}>
        <Navbar />
      </div>
      <div className={styles.right}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Players</h1>
            <p className={styles.subtitle}>
              Browse and analyze player statistics
            </p>
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
                <button
                  className={styles.dropdownButton}
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                >
                  <Filter size={20} />
                  <span>Role</span>
                  <span className={styles.chevron}>▼</span>
                </button>
                {isRoleDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div
                      className={styles.dropdownItem}
                      onClick={() => {
                        setSelectedRole("");
                        setIsRoleDropdownOpen(false);
                      }}
                    >
                      All Roles
                    </div>
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
                  onClick={() =>
                    setIsUniversityDropdownOpen(!isUniversityDropdownOpen)
                  }
                >
                  <Filter size={20} />
                  <span>University</span>
                  <span className={styles.chevron}>▼</span>
                </button>
                {isUniversityDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div
                      className={styles.dropdownItem}
                      onClick={() => {
                        setSelectedUniversity("");
                        setIsUniversityDropdownOpen(false);
                      }}
                    >
                      All Universities
                    </div>
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

          {/* Players table */}
          <div className={styles.playersContainer}>
            {loading ? (
              <div className={styles.loadingState}>Loading players...</div>
            ) : error ? (
              <div className={styles.errorState}>Error: {error}</div>
            ) : filteredPlayers.length === 0 ? (
              <div className={styles.emptyState}>No players found</div>
            ) : (
              <table className={styles.playersTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>University</th>
                    <th>Role</th>
                    <th>Batting Avg</th>
                    <th>Bowling Avg</th>
                    <th>Strike Rate</th>
                    <th>Wickets</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((player) => (
                    <tr key={player._id}>
                      <td>{player.name}</td>
                      <td>{player.university}</td>
                      <td>{player.category}</td>
                      <td>
                        {calculateBattingAverage(
                          player.stats.totalRuns,
                          player.stats.inningsPlayed
                        )}
                      </td>
                      <td>
                        {calculateBowlingAverage(
                          player.stats.runsConceded,
                          player.stats.wickets
                        )}
                      </td>
                      <td>
                        {calculateStrikeRate(
                          player.stats.totalRuns,
                          player.stats.ballsFaced
                        )}
                      </td>
                      <td>{player.stats.wickets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Players;
