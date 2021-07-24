const { catchErr } = require('../main');
module.exports = {
    commands: ['test'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (client, message, args, Discord) => {
        try {
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
        catch(err) {
            catchErr(err, message);
        }
    }
}
