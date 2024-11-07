"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import styles from './routes.module.css';

// Mock data for demonstration purposes
const mockRouteData = {
  1: { averageTime: 25, delayFrequency: 3, peakHours: '8-9 AM' },
  2: { averageTime: 30, delayFrequency: 5, peakHours: '5-6 PM' },
  3: { averageTime: 20, delayFrequency: 2, peakHours: '7-8 AM' },
  4: { averageTime: 28, delayFrequency: 4, peakHours: '6-7 PM' },
};

export default function RouteDetails({ routeId }) {
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    // Simulate data fetching; you could replace this with an API call in production
    const data = mockRouteData[routeId] || {};
    setRouteData(data);
  }, [routeId]);

  if (!routeData) {
    return <Typography variant="body1">Loading data...</Typography>;
  }

  return (
    <Box className={styles.routeDetails}>
      <Typography variant="h5" gutterBottom>{`Details for Route ${routeId}`}</Typography>
      <Typography variant="body1">
        {`Average Travel Time: ${routeData.averageTime ?? 'N/A'} minutes`}
      </Typography>
      <Typography variant="body1">
        {`Delay Frequency: ${routeData.delayFrequency ?? 'N/A'} times per day`}
      </Typography>
      <Typography variant="body1">
        {`Peak Hours: ${routeData.peakHours ?? 'N/A'}`}
      </Typography>
    </Box>
  );
}
