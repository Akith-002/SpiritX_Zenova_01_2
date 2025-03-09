import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Leaderboard.module.css";
import {
  Trophy,
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";

const Leaderboard = () => {
  const [sortColumn, setSortColumn] = useState("rank");
  const [sortDirection, setSortDirection] = useState("asc");
  const [activeFilter, setActiveFilter] = useState("all");

  // Sample leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([
    {
      rank: 1,
      name: "Ravindra Karunatilaka",
      teamName: "Cricket Kings",
      university: "Moratuwa University",
      points: 3245,
      winnings: 45000,
    },
    {
      rank: 2,
      name: "Amal Perera",
      teamName: "Perera XI",
      university: "Colombo University",
      points: 3156,
      winnings: 30000,
    },
    {
      rank: 3,
      name: "Nimali De Silva",
      teamName: "Silva Strikers",
      university: "Peradeniya University",
      points: 3089,
      winnings: 25000,
    },
    {
      rank: 4,
      name: "Dinesh Jayawardena",
      teamName: "Lion Warriors",
      university: "Kelaniya University",
      points: 2987,
      winnings: 15000,
    },
    {
      rank: 5,
      name: "Priyantha Fernando",
      teamName: "Thunder Bolts",
      university: "Jaffna University",
      points: 2934,
      winnings: 10000,
    },
    {
      rank: 6,
      name: "Chaminda Bandara",
      teamName: "Southern Stars",
      university: "Ruhuna University",
      points: 2876,
      winnings: 7500,
    },
    {
      rank: 7,
      name: "Lasith Malinga",
      teamName: "Slinga Kings",
      university: "Colombo University",
      points: 2845,
      winnings: 5000,
    },
    {
      rank: 8,
      name: "Nuwani Rathnayake",
      teamName: "Royal Challengers",
      university: "Peradeniya University",
      points: 2789,
      winnings: 5000,
    },
    {
      rank: 9,
      name: "Kushan Mendis",
      teamName: "Cricket Masters",
      university: "Moratuwa University",
      points: 2765,
      winnings: 2500,
    },
    {
      rank: 10,
      name: "Hiruni Wijesinghe",
      teamName: "Eagle Squad",
      university: "Jaffna University",
      points: 2734,
      winnings: 2500,
    },
    {
      rank: 11,
      name: "Lalith Kumara",
      teamName: "Victory Eleven",
      university: "Kelaniya University",
      points: 2698,
      winnings: 1000,
    },
    {
      rank: 12,
      name: "Tharindu Sampath",
      teamName: "Dream Team",
      university: "Ruhuna University",
      points: 2645,
      winnings: 1000,
    },
  ]);

  // Sorting functionality
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Filter functionality
  const filterData = (filter) => {
    setActiveFilter(filter);
  };

  // Apply sorting and filtering
  const filteredData =
    activeFilter === "all"
      ? leaderboardData
      : leaderboardData.filter((item) =>
          item.university.toLowerCase().includes(activeFilter.toLowerCase())
        );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? (
        <ChevronUp size={16} />
      ) : (
        <ChevronDown size={16} />
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Navbar />
      </div>
      <div className={styles.right}>
        <main className={styles.main}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>Leaderboard</h1>
              <p className={styles.subtitle}>
                See how your team ranks against other participants
              </p>
            </div>
            <div className={styles.searchContainer}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search teams or players"
                className={styles.searchInput}
              />
            </div>
          </header>

          <div className={styles.topSection}>
            <div className={styles.topRankersGrid}>
              {sortedData.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className={`${styles.topRankerCard} ${
                    index === 0 ? styles.firstPlace : ""
                  }`}
                >
                  <div className={styles.rankBadge}>
                    {index === 0 ? (
                      <Trophy size={24} className={styles.trophyIcon} />
                    ) : (
                      <span>{item.rank}</span>
                    )}
                  </div>
                  <div className={styles.rankerInfo}>
                    <h3 className={styles.rankerName}>{item.name}</h3>
                    <p className={styles.rankerTeam}>{item.teamName}</p>
                    <p className={styles.rankerUniversity}>{item.university}</p>
                    <div className={styles.rankerStats}>
                      <div className={styles.rankerPoints}>
                        <strong>{item.points.toLocaleString()}</strong> points
                      </div>
                      <div className={styles.rankerWinnings}>
                        Rs. {item.winnings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filtersSection}>
            <div className={styles.filterTabs}>
              <button
                className={`${styles.filterTab} ${
                  activeFilter === "all" ? styles.activeFilter : ""
                }`}
                onClick={() => filterData("all")}
              >
                All Universities
              </button>
              <button
                className={`${styles.filterTab} ${
                  activeFilter === "Moratuwa University"
                    ? styles.activeFilter
                    : ""
                }`}
                onClick={() => filterData("Moratuwa University")}
              >
                Moratuwa
              </button>
              <button
                className={`${styles.filterTab} ${
                  activeFilter === "Colombo University"
                    ? styles.activeFilter
                    : ""
                }`}
                onClick={() => filterData("Colombo University")}
              >
                Colombo
              </button>
              <button
                className={`${styles.filterTab} ${
                  activeFilter === "Peradeniya University"
                    ? styles.activeFilter
                    : ""
                }`}
                onClick={() => filterData("Peradeniya University")}
              >
                Peradeniya
              </button>
              <button className={styles.moreFiltersBtn}>
                <Filter size={16} />
                More Filters
              </button>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.leaderboardTable}>
              <thead>
                <tr>
                  <th
                    className={sortColumn === "rank" ? styles.sortActive : ""}
                    onClick={() => handleSort("rank")}
                  >
                    <div className={styles.thContent}>
                      Rank {getSortIcon("rank")}
                    </div>
                  </th>
                  <th
                    className={sortColumn === "name" ? styles.sortActive : ""}
                    onClick={() => handleSort("name")}
                  >
                    <div className={styles.thContent}>
                      Player {getSortIcon("name")}
                    </div>
                  </th>
                  <th
                    className={
                      sortColumn === "teamName" ? styles.sortActive : ""
                    }
                    onClick={() => handleSort("teamName")}
                  >
                    <div className={styles.thContent}>
                      Team Name {getSortIcon("teamName")}
                    </div>
                  </th>
                  <th
                    className={
                      sortColumn === "university" ? styles.sortActive : ""
                    }
                    onClick={() => handleSort("university")}
                  >
                    <div className={styles.thContent}>
                      University {getSortIcon("university")}
                    </div>
                  </th>
                  <th
                    className={sortColumn === "points" ? styles.sortActive : ""}
                    onClick={() => handleSort("points")}
                  >
                    <div className={styles.thContent}>
                      Points {getSortIcon("points")}
                    </div>
                  </th>
                  <th
                    className={
                      sortColumn === "winnings" ? styles.sortActive : ""
                    }
                    onClick={() => handleSort("winnings")}
                  >
                    <div className={styles.thContent}>
                      Winnings (Rs.) {getSortIcon("winnings")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td>
                      <div className={styles.rankCell}>
                        <div
                          className={`${styles.rankIndicator} ${
                            item.rank <= 3
                              ? styles.topRank
                              : item.rank <= 10
                              ? styles.goodRank
                              : ""
                          }`}
                        >
                          {item.rank}
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.teamName}</td>
                    <td>{item.university}</td>
                    <td className={styles.pointsCell}>
                      {item.points.toLocaleString()}
                    </td>
                    <td className={styles.winningsCell}>
                      Rs. {item.winnings.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button className={styles.paginationBtn}>Previous</button>
            <div className={styles.paginationNumbers}>
              <button className={styles.paginationActive}>1</button>
              <button>2</button>
              <button>3</button>
              <span>...</span>
              <button>8</button>
            </div>
            <button className={styles.paginationBtn}>Next</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
