const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['ping'],
    minArgs: 0,
    callback: (message,  arguments, text) => {

        const newEmbed = new Discord.MessageEmbed()

            .setColor('#00000')
            .setTitle('**Ping**')
            .addFields(

                { name: '‎‎‏‏‎ ‎', value: 'Pong' },
                { name: '‏‏‎ ‎', value: `Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`}

            )
            message.channel.send(newEmbed)
    }



}