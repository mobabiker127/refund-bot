const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['slowmode', 'slow'],
    minArgs: 1,
    maxArgs: 1,
    permissions: ['MANAGE_MESSAGES'],
    callback: (message, arguments, text) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You don't have permission to do that.");
        }
        if (!arguments[0]) return message.reply("Please enter the slowmode value.");
        if (isNaN(arguments[0])) return message.reply("That is not a number.");
        if (arguments[0] < 0) return message.reply("That is not a valid number.");
        if (arguments[0] > 3600) return message.reply("You cannot set slowmode to greater than 1 hour.");
        const messageArray = message.content.split(' ');

        message.channel.setRateLimitPerUser(arguments[0])
        message.channel.send(`Slowmode has been set to ${arguments[0]} seconds.`)

    }
}