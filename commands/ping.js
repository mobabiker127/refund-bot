const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['ping'],
    minArgs: 0,
    callback: (message,  arguments, text) => {

        message.channel.send('pong')
    }



}