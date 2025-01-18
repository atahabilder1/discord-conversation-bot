// File: commands/shop.js
const { MessageEmbed } = require('discord.js');

// Sample items in the shop
const shopItems = [
    { id: 1, name: 'Basic Rod', type: 'rod', price: 100, description: 'A standard fishing rod with no bonuses.' },
    { id: 2, name: 'Advanced Rod', type: 'rod', price: 500, description: 'A rod with a higher chance of catching rare fish.' },
    { id: 3, name: 'Legendary Rod', type: 'rod', price: 1000, description: 'A rod with a much higher chance of catching legendary fish.' },
    { id: 4, name: 'Basic Bait', type: 'bait', price: 50, description: 'Increases chances of catching medium-sized fish.' },
    { id: 5, name: 'Premium Bait', type: 'bait', price: 200, description: 'Increases chances of catching large and colossal fish.' },
];

// Temporary user data for testing purposes
let userData = {
    money: 500,
    inventory: [],
};

module.exports = {
    name: 'shop',
    description: 'View and purchase items from the shop.',
    execute(message, args) {
        if (!args[0]) {
            // Display shop items
            const embed = new MessageEmbed()
                .setTitle('🎣 Fishing Shop')
                .setDescription('Use `!shop buy <item_id>` to purchase an item.')
                .setColor('#ffcc00');

            shopItems.forEach((item) => {
                embed.addField(
                    `ID: ${item.id} - ${item.name} ($${item.price})`,
                    item.description,
                    false
                );
            });

            message.channel.send({ embeds: [embed] });
        } else if (args[0] === 'buy') {
            const itemId = parseInt(args[1]);
            const item = shopItems.find((i) => i.id === itemId);

            if (!item) {
                message.channel.send('❌ Invalid item ID. Please check the shop and try again.');
                return;
            }

            if (userData.money < item.price) {
                message.channel.send('❌ You don\'t have enough money to buy this item.');
                return;
            }

            // Deduct money and add item to inventory
            userData.money -= item.price;
            userData.inventory.push(item);

            message.channel.send(`✅ You successfully purchased **${item.name}** for $${item.price}.`);
        } else {
            message.channel.send('❌ Invalid command. Use `!shop` to view items or `!shop buy <item_id>` to buy an item.');
        }
    },
};
