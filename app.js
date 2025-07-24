const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.APP_ENV || 'development';

app.get('/', (req, res) => {
  res.send(`This is from my local machine to the ${ENV} environment!`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', environment: ENV });
});

app.listen(PORT, () => {
  console.log(`✅ Server running in ${ENV} mode on port ${PORT}`);
});
