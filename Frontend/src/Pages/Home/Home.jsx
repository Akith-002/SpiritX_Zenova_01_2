import styles from "./styles.module.css"

export default function Home() {
  return (
    <div className={styles.flexCol + " " + styles.minHScreen}>
      {/* Navigation Bar */}
      <header className={styles.header}>
        <div className={styles.headerContainer + " " + styles.container}>
          <h1 className={styles.logo}>Spirit11</h1>
          <div className={styles.buttonGroup}>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.registerButton}>Register</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className={styles.main + " " + styles.flexGrow}>
        <section className={styles.heroSection + " " + styles.container}>
          <h2 className={styles.heroTitle}>Build Your Dream Cricket Team</h2>
          <p className={styles.heroText}>
            Join Spirit11, the fantasy cricket league for the Inter-University Cricket Tournament. Draft real university
            players, analyze statistics, and compete for the top spot!
          </p>
          <button className={styles.ctaButton}>Get Started</button>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorksSection + " " + styles.container}>
          <h2 className={styles.sectionTitle}>How It Works</h2>

          <div className={styles.stepsGrid}>
            {/* Step 1 */}
            <div className={styles.stepItem}>
              <div className={styles.stepCircle}>
                <span className={styles.stepNumber}>1</span>
              </div>
              <h3 className={styles.stepTitle}>Draft Players</h3>
              <p className={styles.stepDescription}>
                Select players from different universities to build your dream team.
              </p>
            </div>

            {/* Step 2 */}
            <div className={styles.stepItem}>
              <div className={styles.stepCircle}>
                <span className={styles.stepNumber}>2</span>
              </div>
              <h3 className={styles.stepTitle}>Manage Budget</h3>
              <p className={styles.stepDescription}>Balance your team selection within the allocated budget.</p>
            </div>

            {/* Step 3 */}
            <div className={styles.stepItem}>
              <div className={styles.stepCircle}>
                <span className={styles.stepNumber}>3</span>
              </div>
              <h3 className={styles.stepTitle}>Compete & Win</h3>
              <p className={styles.stepDescription}>
                Earn points based on your players' real-life performances and climb the leaderboard.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerText}>© 2025 Spirit11. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

