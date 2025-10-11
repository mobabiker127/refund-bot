const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['ping'],
    minArgs: 0,
    callback: (message,  args, text) => {

        const newEmbed = new Discord.MessageEmbed()

            .setColor('#F30707')
            .addFields(
                { name: '‏‏‎Pong', value: `Latency is ${Date.now() - message.createdTimestamp}ms.`}
            )
            message.channel.send(newEmbed)
    }



}