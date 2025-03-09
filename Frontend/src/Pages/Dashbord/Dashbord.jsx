import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../../components/Navbar/Navbar';
import styles from './Dashbord.module.css'; // Correctly import the CSS module
import { Users, Trophy, DollarSign, TrendingUp, LogOut, MessageSquare, User, UserPlus } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreateTeamClick = () => {
    navigate('/TeamSelection'); // Navigate to TeamSelection tab
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
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Welcome to Spirit11 Fantasy Cricket League</p>
          </div>
          <button className={styles.createTeamBtn} onClick={handleCreateTeamClick}>Create Your Team</button>
        </header>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>Team Points</span>
              <TrendingUp size={18} />
            </div>
            <div className={styles.statValue}>1,245</div>
            <div className={styles.statDetail}>+15% from last match</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>Leaderboard Rank</span>
              <Trophy size={18} />
            </div>
            <div className={styles.statValue}>24</div>
            <div className={styles.statDetail}>Top 10% of all teams</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>Team Players</span>
              <Users size={18} />
            </div>
            <div className={styles.statValue}>9/11</div>
            <div className={styles.statDetail}>2 more players needed</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>Budget Remaining</span>
              {/* <DollarSign size={18} /> */}
            </div>
            <div className={styles.statValue}>Rs.1,050,000</div>
            <div className={styles.statDetail}>Out of Rs.9,000,000 </div>
          </div>
        </div>
        <div className={styles.contentGrid}>
          <div className={styles.contentCard}>
            <h2 className={styles.cardTitle}>Upcoming Matches</h2>
            <p className={styles.cardSubtitle}>Plan your team selection based on upcoming fixtures</p>

            <div className={styles.matchList}>
              <div className={styles.matchItem}>
                <div className={styles.teamInfo}>
                  <div className={styles.teamBadge}>MU</div>
                  <div className={styles.teamDetails}>
                    <div className={styles.teamName}>Moratuwa University</div>
                    <div className={styles.teamOpponent}>vs. Colombo University</div>
                  </div>
                </div>
                <div className={styles.matchTime}>
                  <div className={styles.matchDay}>Tomorrow</div>
                  <div className={styles.matchHour}>10:00 AM</div>
                </div>
              </div>

              <div className={styles.matchItem}>
                <div className={styles.teamInfo}>
                  <div className={styles.teamBadge}>PU</div>
                  <div className={styles.teamDetails}>
                    <div className={styles.teamName}>Peradeniya University</div>
                    <div className={styles.teamOpponent}>vs. Jaffna University</div>
                  </div>
                </div>
                <div className={styles.matchTime}>
                  <div className={styles.matchDay}>Sat, Mar 12</div>
                  <div className={styles.matchHour}>2:00 PM</div>
                </div>
              </div>

              <div className={styles.matchItem}>
                <div className={styles.teamInfo}>
                  <div className={styles.teamBadge}>RU</div>
                  <div className={styles.teamDetails}>
                    <div className={styles.teamName}>Ruhuna University</div>
                    <div className={styles.teamOpponent}>vs. Kelaniya University</div>
                  </div>
                </div>
                <div className={styles.matchTime}>
                  <div className={styles.matchDay}>Sun, Mar 13</div>
                  <div className={styles.matchHour}>10:00 AM</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contentCard}>
            <h2 className={styles.cardTitle}>Top Performers</h2>
            <p className={styles.cardSubtitle}>Players with the highest points in the tournament</p>

            <div className={styles.playerList}>
              <div className={styles.playerItem}>
                <div className={styles.playerInfo}>
                  <div className={styles.playerRank}>1</div>
                  <div className={styles.playerDetails}>
                    <div className={styles.playerName}>Ashan Kumar</div>
                    <div className={styles.playerTeam}>Moratuwa University - Batsman</div>
                  </div>
                </div>
                <div className={styles.playerStats}>
                  <div className={styles.playerPoints}>342 pts</div>
                  <div className={styles.playerMatches}>3 matches</div>
                </div>
              </div>

              <div className={styles.playerItem}>
                <div className={styles.playerInfo}>
                  <div className={styles.playerRank}>2</div>
                  <div className={styles.playerDetails}>
                    <div className={styles.playerName}>Dinesh Priyantha</div>
                    <div className={styles.playerTeam}>Colombo University - All-rounder</div>
                  </div>
                </div>
                <div className={styles.playerStats}>
                  <div className={styles.playerPoints}>315 pts</div>
                  <div className={styles.playerMatches}>3 matches</div>
                </div>
              </div>

              <div className={styles.playerItem}>
                <div className={styles.playerInfo}>
                  <div className={styles.playerRank}>3</div>
                  <div className={styles.playerDetails}>
                    <div className={styles.playerName}>Nuwan Perera</div>
                    <div className={styles.playerTeam}>Peradeniya University - Bowler</div>
                  </div>
                </div>
                <div className={styles.playerStats}>
                  <div className={styles.playerPoints}>298 pts</div>
                  <div className={styles.playerMatches}>3 matches</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>  
      </div>
    </div>
  );
};

export default Dashboard;
