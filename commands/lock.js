const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['lock', 'lockdown'],
    minArgs: 0,
    permissions: ['MANAGE_CHANNELS'],
    async callback(message, arguments, text) {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.reply("You don't have permission to do that.");
        }
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have permissions to run this command.')

        const role = message.guild.roles.cache.find(role => role.name === "Customer");

        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(arguments[0]);
        if (!lockChannel) lockChannel = message.channel;

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: false
        }).catch(err => console.log(err));
        message.channel.send('Channel has been locked, silence.');


    }
}
