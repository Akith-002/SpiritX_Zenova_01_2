import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.flexCol + " " + styles.minHScreen}>
      {/* Navigation Bar */}
      <header className={styles.header}>
        <div className={styles.headerContainer + " " + styles.container}>
          <h1 className={styles.logo}>Spirit11</h1>
          <div className={styles.buttonGroup}>
            <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
            <button className={styles.registerButton} onClick={handleSignUpClick}> Sign Up</button>
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
          <button className={styles.ctaButton} data-popup="Click to get started with Spirit11!">Get Started</button>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorksSection + " " + styles.container}>
          <h2 className={styles.sectionTitle}>How It Works</h2>

          <div className={styles.stepsGrid}>
            {/* Step 1 */}
            <div className={styles.stepItem} data-popup="Select players from different universities to build your dream team.">
              <div className={styles.stepCircle}>
                <span className={styles.stepNumber}>1</span>
              </div>
              <h3 className={styles.stepTitle}>Draft Players</h3>
              <p className={styles.stepDescription}>
                Select players from different universities to build your dream team.
              </p>
            </div>

            {/* Step 2 */}
            <div className={styles.stepItem} data-popup="Balance your team selection within the allocated budget.">
              <div className={styles.stepCircle}>
                <span className={styles.stepNumber}>2</span>
              </div>
              <h3 className={styles.stepTitle}>Manage Budget</h3>
              <p className={styles.stepDescription}>Balance your team selection within the allocated budget.</p>
            </div>

            {/* Step 3 */}
            <div className={styles.stepItem} data-popup="Earn points based on your players' real-life performances and climb the leaderboard.">
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

        {/* AI Section */}
        <section className={styles.aiSection + " " + styles.container}>
          <div className={styles.aiContent}>
            <h2 className={styles.aiTitle}>AI-Powered Assistance</h2>
            <p className={styles.aiDescription}>
              Meet Spiriter, your AI assistant that helps you make smart picks for your fantasy team. Get personalized
              advice based on player statistics and match conditions.
            </p>
            <button className={styles.tryButton}>Try Spiriter Now</button>
          </div>
          <div className={styles.chatContainer} data-popup="This is a chat popup!">
            <div className={styles.chatQuestion}>Which batsman should I pick for my team?</div>
            <p className={styles.chatAnswer}>
              Based on recent form, I'd recommend Ashan Kumar from Moratuwa University. He's scored 3 half-centuries in
              the last 4 matches and has a high strike rate against spin bowling.
            </p>
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

