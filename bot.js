require('dotenv').config(); // Load .env variables
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

// Load token and prefix from .env
const token = process.env.DISCORD_TOKEN;
const prefix = process.env.BOT_PREFIX;

// Validate environment variables
if (!token || !prefix) {
    console.error('Error: Missing DISCORD_TOKEN or BOT_PREFIX in .env');
    process.exit(1);
}

// Initialize the bot with necessary intents
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Command collection
client.commands = new Map();

// Load commands from the 'commands' folder
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
}

// Event: Bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event: Handle incoming messages
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) {
        message.reply(`I don't recognize that command. Try using a valid command.`);
        return;
    }

    try {
        // Pass the client to the command for proper context
        await command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

// Login the bot using the token
client.login(token);
