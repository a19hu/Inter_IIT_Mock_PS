import React, { useEffect } from 'react';

const Contributor = () => {
  useEffect(() => {
    // Redirect to the GitHub page
    window.location.href = 'https://github.com/sps1001/';
  }, []);

  return (
    <div style={styles.container}>
      <p style={styles.text}>Redirecting to GitHub...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7fc',
  },
  text: {
    fontSize: '20px',
    color: '#333',
  },
};

export default Contributor;
