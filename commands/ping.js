const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    commands: ['ping'],
    minArgs: 0,
    callback: (message,  args, text) => {

        const newEmbed = new EmbedBuilder()

            .setColor('#F30707')
            .addFields(
                { name: '‏‏‎Pong', value: `Latency is ${Date.now() - message.createdTimestamp}ms.`}
            )
            message.channel.send(newEmbed)
    }



}