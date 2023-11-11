const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT ? process.env.PORT : 3000,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_PORT: process.env.SMTP_PORT,
}