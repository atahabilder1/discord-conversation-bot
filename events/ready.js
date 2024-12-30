module.exports = {
    name: 'ready',
    once: true, // Executes only once
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
    },
};
