"use client";
import styles from "./page.module.css";
import Navbar from "./components/navbar"
import Sidebar from './components/sidebar'
import HeroSection from "./components/chart1";
import RoutesOverview from "./components/routes";
import "./fonts.css";

export default function Home() {
  return (
    <div className={styles.container}>
 
      <header className={styles.navbar}>
        <Navbar />
      </header>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.route}>
        <RoutesOverview/>
      </main>
      <main className={styles.content}>
        <HeroSection />
      </main>
    </div>
  );
}
