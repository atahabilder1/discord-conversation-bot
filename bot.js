require('dotenv').config(); // Load .env variables

const { Client, GatewayIntentBits } = require('discord.js');

// Load token and prefix from .env
const token = process.env.DISCORD_TOKEN;
const prefix = process.env.BOT_PREFIX;

// Initialize the bot with necessary intents
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Event: Bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event: Handle incoming messages
client.on('messageCreate', (message) => {
    // Ignore bot messages and non-command messages
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    // Parse the command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Example command: !ping
    if (command === 'ping') {
        message.reply('Pong!');
    }

    // Example command: !greet
    else if (command === 'greet') {
        const username = message.author.username;
        message.reply(`Hello, ${username}!`);
    }

    // Handle unknown commands
    else {
        message.reply(`I don't recognize that command. Try \`${prefix}ping\` or \`${prefix}greet\`.`);
    }
});

// Login the bot using the token
client.login(token);
