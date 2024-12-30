module.exports = {
    name: 'greet',
    description: 'Sends a greeting message!',
    execute(message, args) {
        const username = message.author.username;
        message.reply(`Hello, ${username}! How are you?`);
    },
};
