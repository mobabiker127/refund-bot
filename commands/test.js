const { PermissionsBitField } = require('discord.js');

module.exports = {
    commands: ['test'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['Administrator'],
    callback: (message, args, text) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("You don't have permission to do that.");
        }
        const newEmbed = new EmbedBuilder()
            .setColor('#fffff')
            .setTitle(message.member.displayName)
            .setDescription('')
            .addFields(
            )
        message.channel.send({ embeds: [newEmbed] });


    }
}
