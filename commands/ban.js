const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['ban'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['BAN_MEMBERS'],
    callback: (message, arguments, text) => {


        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("You don't have permission to do that.");
        }
        const member = message.mentions.users.first();
        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.ban();
            message.channel.send("User has been banned.")
        } else {
            message.channel.send('Please mention a user.');
        }

    }
}
