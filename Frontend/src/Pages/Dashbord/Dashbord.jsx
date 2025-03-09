import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Dashbord.module.css'; // Correctly import the CSS module

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Navbar />
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>Dashbord View</h1>
      </div>
    </div>
  );
};

export default Dashboard;
