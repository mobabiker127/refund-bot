const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    commands: ['av', 'avatar'],
    minArgs: 0,
    maxArgs: 1,
    callback: (message, args, text) => {

        const messages = ["Looking good as always", "Might wanna consider something else", "How exciting", "Not your finest piece"]

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        const { EmbedBuilder } = require('discord.js');
        const embed = new EmbedBuilder();

        if (!message.mentions.users.first()) {
            embed.setTitle("Your Avatar:")
            embed.setDescription(randomMessage)
            embed.setColor("#00000")
            embed.setImage(message.author.displayAvatarURL({ size: 4096, dynamic: true }))
            return message.channel.send({ embeds: [embed] });
        } else {
            const user = message.mentions.users.first()
            embed.setTitle(`${user.tag}'s Avatar`)
            embed.setDescription(randomMessage)
            embed.setColor("#00000")
            embed.setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            return message.channel.send({ embeds: [embed] });
        }



    }
}
