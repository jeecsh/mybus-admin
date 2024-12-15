"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import RouteDetails from "./routedetails";
import LiveTrackingButton from "./LiveTrackingButton"; // Existing component
import styles from "./RoutesOverview.module.css";

// Sample line data
const routes = [
  { id: 1, name: "Line 1" },
  { id: 2, name: "Line 2" },
  { id: 3, name: "Line 3" },
  { id: 4, name: "Line 4" },
];

export default function RoutesOverview() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleRouteClick = (routeId) => {
    setSelectedRoute((prev) => (prev === routeId ? null : routeId)); // Toggle selection
  };

  return (
    <Box className={styles.routesOverview}>
      {/* Route Cards Section */}
      <Box className={styles.routeList}>
        {routes.map((route) => (
          <Box
            key={route.id}
            className={`${styles.routeCard} ${
              selectedRoute === route.id ? styles.activeCard : ""
            }`}
            onClick={() => handleRouteClick(route.id)}
          >
            <Box className={styles.statusCircle} />
            <Typography className={styles.routeName}>{route.name}</Typography>
          </Box>
        ))}
      </Box>

      {/* Details and Button Section */}
      <Box className={styles.detailsSection}>
        {selectedRoute ? (
          <>
            <RouteDetails routeId={selectedRoute} />
            <LiveTrackingButton routeId={selectedRoute} />
          </>
        ) : (
          <Typography className={styles.placeholder}>
            Choose a line to view details.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
