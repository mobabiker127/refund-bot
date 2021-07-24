const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['suggest'],
    minArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (message, arguments, text) => {

        const channel = message.guild.channels.cache.find(c => c.name === '📫・suggestions');

        let messageArgs = arguments.join(' ');
        const embed = new Discord.MessageEmbed()
            .setColor('#00000')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(messageArgs);

        channel.send(embed).then((msg) => {
            msg.react('✅');
            msg.react('❌');
            message.delete();
        })



    }
}