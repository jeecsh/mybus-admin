// RoutesOverview.js
"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import RouteDetails from "./routedetails"; // Importing the RouteDetails component
import LiveTrackingButton from "./LiveTrackingButton"; // Assuming this is the live tracking button
import styles from "./RoutesOverview.module.css";

// Sample route data
const routes = [
  { id: 1, name: "Route 1" },
  { id: 2, name: "Route 2" },
  { id: 3, name: "Route 3" },
  { id: 4, name: "Route 4" },
];

export default function RoutesOverview() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <Box className={styles.routesOverview}>
      <Typography variant="h4" className={styles.title}>
        Select a Route to View Details
      </Typography>

      {/* Route selection buttons */}
      <Box className={styles.routeButtons}>
        {routes.map((route) => (
          <Box
            key={route.id}
            className={`${styles.routeButton} ${
              selectedRoute === route.id ? styles.active : ""
            }`}
            onClick={() => setSelectedRoute(route.id)}
          >
            {route.name}
          </Box>
        ))}
      </Box>

      {/* Show route details and live tracking for selected route */}
      {selectedRoute && (
        <Box className={styles.detailsSection}>
          <RouteDetails routeId={selectedRoute} />
          <LiveTrackingButton routeId={selectedRoute} />
        </Box>
      )}
    </Box>
  );
}
