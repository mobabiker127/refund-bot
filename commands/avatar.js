const { catchErr } = require('../commands/command_base');
module.exports = {
    commands: ['av' , 'avatar'],
    permissionError = 'You need admin permissions to run this command.',
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (client, message, args, Discord) => {
        try {
            const embed = new Discord.MessageEmbed()

            if (!message.mentions.users.first()) {
                embed.setTitle("Your Avatar:")
                embed.setDescription("Your avatar is looking sexy.")
                embed.setColor("#F3E107")
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
        catch(err) {
            catchErr(err, message);
        }
}
}
