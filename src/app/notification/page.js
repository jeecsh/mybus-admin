"use client"

import { useState } from 'react';

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [timeFrame, setTimeFrame] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert the timeFrame to the desired format
    const date = new Date(timeFrame);
    const formattedDate = date.toLocaleString('en-US', { 
      timeZone: 'UTC', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    }).replace(',', '');

    const notification = { title, message, timeFrame: formattedDate };

    try {
      const response = await fetch('/api/notifications', {
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
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1em' }}>
      <h1>Send Notification</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '.5em' }}>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
            style={{ width: '100%', padding: '.5em' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '.5em' }}>Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
            style={{ width: '100%', padding: '.5em', minHeight: '100px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1em' }}>
          <label htmlFor="timeFrame" style={{ display: 'block', marginBottom: '.5em' }}>Time Frame</label>
          <input
            type="datetime-local"
            id="timeFrame"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            placeholder="Enter time frame"
            style={{ width: '100%', padding: '.5em' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '.5em 1em', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Send Notification
        </button>
      </form>
    </div>
  );
}
