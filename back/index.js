const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors'); // Ajout du middleware CORS

app.use(express.json());
app.use(cors()); // Utilisation du middleware CORS pour autoriser les requêtes depuis tous les domaines

app.get('/price', async (req, res) => {
    const { token } = req.query;
    try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`);
        console.log(data[token].usd);
        res.json(data);
    } catch (error) {
        console.error('Error fetching price:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
