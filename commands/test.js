const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['test'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (message, args, text) => {

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You don't have permission to do that.");
        }
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#fffff')
            .setTitle(message.member.displayName)
            .setDescription('')
            .addFields(
            )
        message.channel.send(newEmbed);


    }
}
