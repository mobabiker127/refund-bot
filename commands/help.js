const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    commands: ['help'],
    minArgs: 0,
    callback: (message, args, text) => {

        const newEmbed = new EmbedBuilder()

            .setColor('#353532')
            .setTitle('\**__Refund Bot discord commands__**')
            .addFields(
                { name: '?avatar, ?av', value: "Displays your or a mentioned user's avatar." },
                { name: '?ping', value: "Displays the bot's ping." },
                { name: '?refund', value: 'Displays a message describing on how we refund.' },
                { name: '?suggest, ?suggestion', value: 'Sends a suggestion into our suggestion channel.' }


            )
        message.channel.send({ embeds: [newEmbed] });
    }

}