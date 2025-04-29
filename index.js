const qrcode = require('qrcode');
const { Client } = require('whatsapp-web.js');
require('dotenv').config();

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true
    }
});

client.on('qr', qr => {
    qrcode.toDataURL(qr, (err, url) => {
        if (err) {
            console.error('Failed to generate QR code:', err);
        } else {
            console.log('Scan this QR by opening this link in your browser:');
            console.log(url);
        }
    });
});

client.on('ready', () => {
    console.log(`${process.env.BOT_NAME || "DushBot"} is ready!`);
});

client.on('message', async message => {
    if (message.body.toLowerCase() === 'hi') {
        await message.reply('Hello, I am DushBot! How can I help you today?');
    }
});

client.initialize();