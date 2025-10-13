const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    commands: ['suggest', 'suggestion'],
    cooldown: 60 * 1000,
    callback: (message, args, text) => {

        const channel = message.guild.channels.cache.find(c => c.name === '📫・suggestions');

        if (!args[0]) return message.reply("You cannot send empty suggestions.").then(msg => {
            setTimeout(() => msg.delete(), 5000)})

        let messageArgs = args.join(' ');
        const embed = new EmbedBuilder()
            .setColor('#00000')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(messageArgs);

        channel.send({ embeds: [newEmbed] }).then((msg) => {
            msg.react('✅');
            msg.react('❌');
            message.delete();
        })



    }
}