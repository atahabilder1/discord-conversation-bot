module.exports = {
    name: 'messageCreate',
    execute(message) {
        // Ignore messages from bots or without the prefix
        if (!message.content.startsWith(process.env.BOT_PREFIX) || message.author.bot) return;

        // Extract command and arguments
        const args = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Find and execute the command
        const command = message.client.commands.get(commandName);
        if (!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing that command.');
        }
    },
};
