"use client";

import { useState } from 'react';
import Navbar from '../components/navbar'; // Adjust the path as necessary
import Sidebar from '../components/sidebar'; // Adjust the path as necessary
import styles from './notificationsPage.module.css'; // Importing the CSS module

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [timeFrame, setTimeFrame] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notification = { title, message, timeFrame };

    try {
      const response = await fetch('/api/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }

      const data = await response.json();
      console.log('Notification sent successfully:', data);
      
      // Reset form fields after successful submission
      setTitle('');
      setMessage('');
      setTimeFrame('');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.formContainer}>
          <h1 className={styles.pageTitle}>Send Notification</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notification title"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notification message"
                className={styles.textarea}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="timeFrame" className={styles.label}>Time Frame</label>
              <input
                type="datetime-local"
                id="timeFrame"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Notification
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
