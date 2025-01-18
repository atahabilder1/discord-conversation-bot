// File: utils/leveling.js

// Temporary user data structure
let userData = {
    xp: 0,
    level: 1,
};

// Function to calculate the required XP for the next level
function getNextLevelXp(level) {
    return 100 * level; // Example: Level 1 requires 100 XP, Level 2 requires 200 XP, etc.
}

// Function to add XP and handle leveling up
function addXp(amount) {
    userData.xp += amount;
    let levelUp = false;

    while (userData.xp >= getNextLevelXp(userData.level)) {
        userData.xp -= getNextLevelXp(userData.level);
        userData.level += 1;
        levelUp = true;
    }

    return levelUp;
}

// Function to get user stats
function getUserStats() {
    return {
        xp: userData.xp,
        level: userData.level,
        nextLevelXp: getNextLevelXp(userData.level),
    };
}

module.exports = { addXp, getUserStats };
