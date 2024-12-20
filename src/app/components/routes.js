"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RouteDetails from "./routedetails";
import LiveTrackingButton from "./LiveTrackingButton"; // Existing component
import Popup from "./pop"; // Import the Popup component for confirmation
import { useRouter } from "next/navigation";
import styles from "./RoutesOverview.module.css";

export default function RoutesOverview() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to show/hide popup
  const [routeToDelete, setRouteToDelete] = useState(null); // Store route ID for deletion
  const [blurred, setBlurred] = useState(false); // Track if blur effect is applied
  const router = useRouter();

  useEffect(() => {
    function fetchRoutes() {
      fetch("/api/getroutes") // Adjust to your API endpoint
        .then((response) => response.json())
        .then((data) => {
          setRoutes(data);
        })
        .catch((error) => {
          console.error("Error fetching routes:", error);
        });
    }

    fetchRoutes();
  }, []);

  const handleRouteClick = (routeId) => {
    if (deleteMode) {
      setRouteToDelete(routeId);
      setShowPopup(true);
    } else {
      setSelectedRoute((prev) => (prev === routeId ? null : routeId));
    }
  };

  const handleAddClick = () => {
    router.push("/addRoute");
  };

  const toggleDeleteMode = () => {
    setDeleteMode((prev) => !prev);
    setBlurred(true); // Apply the blur effect
  };

  const handleDeleteRoute = () => {
    if (routeToDelete) {
      fetch(`/api/getroutes/${routeToDelete}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete route");
          }
          setRoutes((prev) => prev.filter((route) => route.routeId !== routeToDelete));
          setShowPopup(false); // Close the popup after successful deletion
          setBlurred(false); // Remove blur effect
        })
        .catch((error) => {
          console.error("Error deleting route:", error);
        });
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setRouteToDelete(null); // Reset route to delete when popup is closed
    setBlurred(false); // Remove blur effect if the popup is closed without deletion
  };

  return (
    <Box className={styles.routesOverview}>
      {/* Container for action buttons and route cards */}
      <Box className={`${styles.container} ${blurred ? styles.blurred : ""}`}>
        {/* Action Buttons (Add/Remove) */}
    

        {/* Route Cards */}
        <Box className={styles.routeList}>
       
          {routes.map((route) => (
            <Box
              key={route.routeId}
              className={`${styles.routeCard} ${
                selectedRoute === route.routeId ? styles.selectedCard : ""
              }`}
              onClick={() => handleRouteClick(route.routeId)}
            >
              <Box
                className={styles.statusCircle}
                style={{ backgroundColor: route.routeColor }}
              />
              
              <Typography className={styles.routeName}>
                (Line {route.routeId})
              </Typography>
            </Box>
          ))}
              <Box className={styles.actionButtons}>
          <Box className={styles.actionCard} onClick={toggleDeleteMode}>
            <RemoveCircleIcon className={styles.icon} />
          </Box>

          <Box className={styles.actionCard} onClick={handleAddClick}>
            <AddCircleIcon className={styles.icon} />
          </Box>
          
        </Box>
        
        </Box>
        
      </Box>
      {deleteMode && (
            <Box className={styles.deletePrompt}>
              <Typography>Select a route to delete</Typography>
            </Box>
          )}

      {/* Details Section */}
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

      {/* Popup for deletion confirmation */}
      {showPopup && (
        <Popup
          title="Confirm Deletion"
          message="Are you sure you want to delete this route?"
          onClose={closePopup}
          onConfirm={handleDeleteRoute}
        />
      )}
    </Box>
  );
}
