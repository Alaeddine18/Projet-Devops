const express = require('express');
const { exec } = require('child_process');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Interval to check for a new release (in milliseconds)
const checkInterval = 10000; // 10 seconds

// Docker Hub repository details
const imageName = 'ala91/priceapi';

// Variable to store the current version or release
let currentRelease = '1.0.0'; // Replace with your actual current version

// Function to check for a new release and trigger deploy.sh
const checkForNewRelease = async () => {
  try {
    const response = await axios.get(`https://hub.docker.com/v2/repositories/${imageName}/tags/`);
    const latestRelease = response.data.results[0].name; // Assuming Docker Hub API response has a 'results' array

    // Compare the latest release with the current release or version
    // If a new release is found, trigger deploy.sh
    if (latestRelease !== currentRelease) {
      console.log('New release found. Triggering deploy.sh...');

      // Set execute permissions for deploy.sh
      exec('chmod +x deploy.sh', (error1, stdout1, stderr1) => {
        if (error1) {
          console.error(`Error executing chmod +x deploy.sh: ${error1.message}`);
          return;
        }

        // Execute deploy.sh
        exec('./deploy.sh', (error2, stdout2, stderr2) => {
          if (error2) {
            console.error(`Error executing ./deploy.sh: ${error2.message}`);
            return;
          }
          console.log(`deploy.sh executed successfully. Output: ${stdout2}`);
        });
      });

      // Update the current release variable
      currentRelease = latestRelease;
    }
  } catch (error) {
    console.error('Error checking for new release:', error.message);
  }
};

// Endpoint to manually trigger the check (for testing)
app.get('/check-for-release', (req, res) => {
  checkForNewRelease();
  res.send('Checking for new release...');
});

// Schedule the check at regular intervals
setInterval(checkForNewRelease, checkInterval);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
