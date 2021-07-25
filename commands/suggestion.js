
module.exports = {
    commands: ['suggest', 'suggestion'],
    cooldown: 60 * 1000,
    callback: (message, arguments, text) => {

        const channel = message.guild.channels.cache.find(c => c.name === '📫・suggestions');

        if (!arguments[0]) return message.reply("You cannot send empty suggestions.").then(msg => {
            setTimeout(() => msg.delete(), 5000)})

        let messageArgs = arguments.join(' ');
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
}