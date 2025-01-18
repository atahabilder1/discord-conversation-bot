const userData = require('../utils/userData'); // Import database helper functions
const { MessageEmbed } = require('discord.js');

const fishData = [
    { species: 'Salmon', rarity: 'common' },
    { species: 'Trout', rarity: 'common' },
    { species: 'Bass', rarity: 'common' },
    { species: 'Carp', rarity: 'uncommon' },
    { species: 'Catfish', rarity: 'uncommon' },
    { species: 'Snapper', rarity: 'rare' },
    { species: 'Tuna', rarity: 'rare' },
    { species: 'Swordfish', rarity: 'rare' },
    { species: 'Shark', rarity: 'legendary' },
    { species: 'Golden Koi', rarity: 'legendary' },
    { species: 'Trash', rarity: 'trash' },
];

const sizeData = ['tiny', 'small', 'medium', 'large', 'colossal'];

const rarityMultiplier = {
    common: 10,
    uncommon: 25,
    rare: 50,
    legendary: 100,
    trash: 1,
};

const sizeMultiplier = {
    tiny: 0.5,
    small: 0.75,
    medium: 1,
    large: 1.25,
    colossal: 1.5,
};

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function calculatePrice(rarity, size) {
    return Math.floor(rarityMultiplier[rarity] * sizeMultiplier[size]);
}

module.exports = {
    name: 'fish',
    description: 'Go fishing and see what you catch!',
    async execute(message) {
        const userId = message.author.id;

        // Ensure the user exists in the database
        await userData.addUserIfNotExists(userId);

        const waitTime = Math.random() * 19000 + 1000; // Random delay between 1s and 20s
        await new Promise((resolve) => setTimeout(resolve, waitTime));

        // Determine caught fish, size, and price
        const caughtFish = getRandomElement(fishData);
        const fishSize = getRandomElement(sizeData);
        const price = calculatePrice(caughtFish.rarity, fishSize);

        // Add the caught fish to the user's inventory
        await userData.addItemToInventory(userId, `${fishSize} ${caughtFish.species}`, 'fish', {
            rarity: caughtFish.rarity,
            size: fishSize,
        });

        // Update user's money with the value of the fish
        await userData.updateUserMoney(userId, price);

        // Create an embed to display the result
        const embed = new MessageEmbed()
            .setTitle(`🎣 You caught a ${fishSize} ${caughtFish.species}!`)
            .setDescription(`Rarity: ${caughtFish.rarity.toUpperCase()}\nValue: $${price}`)
            .setColor('#00aaff');

        // Send the embed to the channel
        message.channel.send({ embeds: [embed] });
    },
};
