const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.get('/runscript', (req, res) => {
    // Trigger script execution here
    // You can use child_process.spawn or any other method to execute your script
    const { spawn } = require('child_process');
    const scriptPath = './deploy.sh';

    const deployProcess = spawn('bash', [scriptPath]);

    deployProcess.stdout.on('data', (data) => {
        console.log(`Script output: ${data}`);
    });

    deployProcess.stderr.on('data', (data) => {
        console.error(`Script error: ${data}`);
    });

    deployProcess.on('close', (code) => {
        console.log(`Script exited with code ${code}`);
    });

    res.status(200).json({ message: 'Deployment script initiated' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
