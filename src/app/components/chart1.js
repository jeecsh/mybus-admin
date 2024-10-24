"use client"

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, BarChart } from '@mui/x-charts'; // Using X-Charts from MUI
import styles from './chart1.module.css'; // Your CSS module

// Random Data Generation for 7 days of a week (Monday to Sunday)
const generateMockPassengerData = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.map((day) => ({
    date: day,
    count: Math.floor(Math.random() * 100) + 20, // Random passenger count between 20 and 120
  }));
};

// Random Data Generation for 4 Bus Routes over 7 days
const generateMockRoutePopularity = () => {
  const routes = ['Route 1', 'Route 2', 'Route 3', 'Route 4'];
  return routes.map((route) => ({
    name: route,
    count: Math.floor(Math.random() * 300) + 50, // Random popularity between 50 and 350 passengers
  }));
};

const HeroSection = () => {
  const [passengerData, setPassengerData] = useState([]);
  const [routePopularity, setRoutePopularity] = useState([]);

  useEffect(() => {
    // Generate mock data when the component is mounted
    setPassengerData(generateMockPassengerData());
    setRoutePopularity(generateMockRoutePopularity());
  }, []);

  return (
    <Box sx={{ padding: '40px', backgroundColor: '#f9fafb', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" align="center" sx={{ color: '#1e3a8a', marginBottom: '20px' }}>
        Bus Tracking Dashboard
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {/* Passenger Count Over the Week */}
        <Box sx={{ width: { xs: '100%', sm: '45%' }, marginBottom: '20px', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h6" gutterBottom>Passenger Count Over the Week</Typography>
          <LineChart
            width={500}
            height={300}
            series={[
              {
                data: passengerData.map((entry) => entry.count),
                label: 'Passengers',
                color: '#3b82f6',
              },
            ]}
            xAxis={[
              {
                data: passengerData.map((entry) => entry.date),
                scaleType: 'band', // X-axis for categories (days of the week)
              },
            ]}
          />
        </Box>
        
        {/* Bus Route Popularity */}
        <Box sx={{ width: { xs: '100%', sm: '45%' }, backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h6" gutterBottom>Bus Route Popularity</Typography>
          <BarChart
            width={500}
            height={300}
            series={[
              {
                data: routePopularity.map((route) => route.count),
                label: 'Passenger Count',
                color: '#3b82f6',
              },
            ]}
            xAxis={[
              {
                data: routePopularity.map((route) => route.name),
                scaleType: 'band', // X-axis for categories (bus routes)
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
