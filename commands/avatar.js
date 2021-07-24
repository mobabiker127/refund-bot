const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['av', 'avatar'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (message, arguments, text) => {

        const embed = new Discord.MessageEmbed()

        if (!message.mentions.users.first()) {
            embed.setTitle("Your Avatar:")
            embed.setDescription("Your avatar is looking sexy.")
            embed.setColor("#00000")
            embed.setImage(message.author.displayAvatarURL({ size: 4096, dynamic: true }))
            return message.channel.send(embed)
        } else {
            const user = message.mentions.users.first()
            embed.setTitle(`${user.tag}'s Avatar`)
            embed.setDescription(`They should really change it. `)
            embed.setColor("#00000")
            embed.setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            return message.channel.send(embed)
        }



    }
}
