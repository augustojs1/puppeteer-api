const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors');
const app = express();

dotenv.config({ path: './src/config/config.env' });

app.use(express.json());

const puppeteerRoute = require('./src/routes/puppeteer.route');
app.use(puppeteerRoute);

app.options(cors());

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in port ${PORT}`));