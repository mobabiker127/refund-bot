const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['edit'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    async callback(message, arguments, text) {

        const msgid = message.channel.messages.fetch('869567771502063626').then(msg => {
        msg.edit = ('hello world')
        })

        

        
        
    }
}