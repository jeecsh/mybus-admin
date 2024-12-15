

"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './feedback.module.css';
import Navbar from '../components/navbar'; // Adjust the path as necessary
import Sidebar from '../components/sidebar'; // Adjust the path as necessary  

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(); // Track sidebar state


  useEffect(() => {
    // Fetch all feedback from the API when the component mounts
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('/api/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`/api/feedback/${id}`);
      // Filter out the deleted feedback from the UI
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };                                                                                  

  const deleteAllFeedback = async () => {
    try {
      await axios.delete('/api/feedback');
      setFeedbacks([]);  // Clear all feedback in the UI
    } catch (error) {
      console.error('Error deleting all feedback:', error);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`${styles.content} ${!isSidebarOpen ? styles.shifted : ''}`}>
      <h1 className={styles.h1}>User Feedback</h1>
      <ul className={styles.feedbackList}>
        {feedbacks.length > 0 ? (
          feedbacks.map(feedback => (
            <li key={feedback.id} className={styles.feedbackItem}>
              <p>{feedback.feedback}</p>
              <small>{new Date(feedback.timestamp).toLocaleString()}</small>
              <button
                className={styles.deleteBtn}
                onClick={() => deleteFeedback(feedback.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No feedback available</p>
        )}
      </ul>

      {feedbacks.length > 0 && (
        <button onClick={deleteAllFeedback} className={styles.deleteAllBtn}>
          Delete All Feedback
        </button>
      )}
      </div>
    </div>
    </div>
  );
};

export default FeedbackPage;
