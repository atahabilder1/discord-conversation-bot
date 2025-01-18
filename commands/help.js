module.exports = {
    name: 'help',
    description: 'List all available commands',
    execute(message, args) {
        // Access the commands collection from the client
        const commands = message.client.commands;

        // Generate a list of command names and descriptions
        const commandList = commands.map(
            (cmd) => `**${cmd.name}**: ${cmd.description || 'No description available'}`
        ).join('\n');

        // Send the list as a reply
        message.reply(`Here are the available commands:\n\n${commandList}`);
    },
};
