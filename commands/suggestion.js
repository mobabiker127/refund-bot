const { catchErr } = require('../commands/error');
module.exports = {
    commands: ['suggest'],
    minArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (client, message, args, Discord) => {
        try {
            const channel = message.guild.channels.cache.find(c => c.name === '📫・suggestions');

            let messageArgs = args.join(' ');
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
        catch (err) {
            catchErr(err, message);
        }
    }
}