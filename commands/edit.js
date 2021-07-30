const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['edit'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    async callback(message, arguments, text) {

        const msg =  message.channel.messages.fetch('870681103667691560')

        msg.edit = ('hello world').then(() => {
            message.reply("Message edited").catch(err => {
                console.log(err);
            })
        })
        

        

        
        
    }
}