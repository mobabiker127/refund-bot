const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['clear', 'purge'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['MANAGE_MESSAGES'],
    async callback(message, arguments, text) {

        const reply_message = new Discord.MessageEmbed()
        .setColor('#6d0da4')
        .setTitle('Successfully deleted messages!')

        if(!args[0]) return message.reply("Please enter an amount of messages you wish to clear!");
        if(isNaN(args[0])) return message.reply("Please enter a real number bro!");

        if(args[0] > 100) return message.reply("You cannot delete more than 100 messages!");
        if(args[0] < 1) return message.reply("You must delete at least one message!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{ // Fetches messages
            message.channel.bulkDelete(messages); // Deletes messages
            message.channel.send(reply_message)
        });
    }
 }

