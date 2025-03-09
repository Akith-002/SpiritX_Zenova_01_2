import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Dashbord.module.css'; // Correctly import the CSS module
import { Users, Trophy, DollarSign, TrendingUp, LogOut, MessageSquare, User, UserPlus } from "lucide-react";

const Dashboard = () => {
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
          <button className={styles.createTeamBtn}>Create Your Team</button>
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
              <DollarSign size={18} />
            </div>
            <div className={styles.statValue}>Rs.1,050,000</div>
            <div className={styles.statDetail}>Out of Rs.9,000,000 </div>
          </div>
        </div>
      </main>  
      </div>
    </div>
  );
};

export default Dashboard;
