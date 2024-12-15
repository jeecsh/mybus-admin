"use client";

import { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import HeroSection from "./components/chart1";
import RoutesOverview from "./components/routes";
import styles from "./page.module.css";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <Navbar />
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className={`${styles.mainContent} ${!isSidebarOpen ? styles.shifted : ""}`}>
        <RoutesOverview />
        <HeroSection />
      </main>
    </div>
  );
}
