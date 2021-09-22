const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors');
const app = express();

dotenv.config({ path: './config/config.env' });

const puppeteerRoute = require('./routes/puppeteer.route');
app.use(puppeteerRoute);

app.use(express.json());

app.options(cors());

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in port ${PORT}`));