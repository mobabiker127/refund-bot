const { catchErr } = require('../handlers/command_handler');
module.exports = {
    name: 'suggest',
    cooldown: 60,
    description: "sends a suggestion in a specific channel",
    permissions: [],
    execute(message, args, cmd, client, Discord) {
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