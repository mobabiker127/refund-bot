const Discord = require('discord.js');

module.exports = {
    commands: ['clear', 'purge'],
    minArgs: 1,
    maxArgs: 1,
    permissions: ['ManageMessages'],
    async callback(message, args) {

        // creating embed
        const reply_message = new Discord.MessageEmbed()
            .setColor('#6d0da4')
            .setTitle('Successfully deleted messages!')
            .setDescription(`Deleted ${args[0]} messages successfully.`);

        // checking arguments
        if(!args[0]) return message.reply("``Please enter an amount of messages you wish to clear!``");
        if(isNaN(args[0])) return message.reply("``Please enter a real number bro!``");
        if(args[0] > 100) return message.reply("``You cannot delete more than 100 messages!``");
        if(args[0] < 1) return message.reply("``You must delete at least one message!``");

        // deleting messages
        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages);
            message.channel.send(reply_message);
        });
    }
}
