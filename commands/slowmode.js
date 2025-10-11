const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['slowmode', 'slow'],
    minArgs: 1,
    maxArgs: 1,
    permissions: ['MANAGE_MESSAGES'],
    callback: (message, args, text) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You don't have permission to do that.");
        }
        if (!args[0]) return message.reply("Please enter the slowmode value.");
        if (isNaN(args[0])) return message.reply("That is not a number.");
        if (args[0] < 0) return message.reply("That is not a valid number.");
        if (args[0] > 3600) return message.reply("You cannot set slowmode to greater than 1 hour.");
        const messageArray = message.content.split(' ');

        message.channel.setRateLimitPerUser(args[0])
        message.channel.send(`Slowmode has been set to ${args[0]} seconds.`)

    }
}