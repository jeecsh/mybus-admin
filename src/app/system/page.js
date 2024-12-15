"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styles from "./sys.module.css";
import { 
  Thermostat, Memory, BatteryFull, CameraAlt, RestartAlt, Speed 
} from "@mui/icons-material";

export default function SystemHealth() {
  const [isSidebarOpen, setIsSidebarOpen] = useState();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const mockData = {
    temperature: 45.5,
    cpuUsage: 55,
    memoryUsage: { used: 850, total: 1024 },
    voltage: 1.2,
    lowVoltageWarning: false,
    cameraConnected: true,
    raspberryPiStatus: "Connected",
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
      <main
        className={`${styles.mainContent} ${
          !isSidebarOpen ? styles.shifted : ""
        }`}
      >
        <div className={styles.grid}>
          {/* Temperature */}
          <Card
            title="Temperature"
            icon={<Thermostat style={{ color: "red" }} />}
            value={`${mockData.temperature} °C`}
            isWarning={mockData.temperature > 70}
          />

          {/* CPU Usage */}
          <Card
            title="CPU Usage"
            icon={<Speed style={{ color: "blue" }} />}
            customContent={
              <ProgressBar percentage={mockData.cpuUsage} />
            }
          />

          {/* Memory Usage */}
          <Card
            title="Memory Usage"
            icon={<Memory style={{ color: "purple" }} />}
            customContent={
              <>
                <ProgressBar
                  percentage={
                    (mockData.memoryUsage.used /
                      mockData.memoryUsage.total) *
                    100
                  }
                />
                <p className={styles.smallText}>
                  {mockData.memoryUsage.used}MB /{" "}
                  {mockData.memoryUsage.total}MB
                </p>
              </>
            }
          />

          {/* Voltage */}
          <Card
            title="Voltage Level"
            icon={<BatteryFull style={{ color: "orange" }} />}
            value={`${mockData.voltage}V`}
            isWarning={mockData.lowVoltageWarning}
            warningMessage="Low Voltage Warning!"
          />

          {/* Camera Status */}
          <Card
            title="Camera Status"
            icon={
              <CameraAlt
                style={{
                  color: mockData.cameraConnected ? "green" : "red",
                }}
              />
            }
            value={mockData.cameraConnected ? "Connected" : "Disconnected"}
            isWarning={!mockData.cameraConnected}
          />

          {/* Raspberry Pi Actions */}
          <Card
            title="Actions"
            icon={<RestartAlt style={{ color: "gray" }} />}
            customContent={
              <button className={styles.button}>
                Restart Raspberry Pi
              </button>
            }
          />
        </div>
      </main>
    </div>
  );
}

function Card({ title, icon, value, isWarning, warningMessage, customContent }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.icon}>{icon}</span>
        <h3>{title}</h3>
      </div>
      {value && (
        <p
          className={`${styles.value} ${
            isWarning ? styles.warning : styles.normal
          }`}
        >
          {value}
        </p>
      )}
      {isWarning && warningMessage && (
        <p className={styles.warning}>{warningMessage}</p>
      )}
      {customContent && <div>{customContent}</div>}
    </div>
  );
}

function ProgressBar({ percentage }) {
  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progressFill}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
