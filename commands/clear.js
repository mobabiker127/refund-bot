const { catchErr } = require('../commands/command_base');
module.exports = {
    commands: ['clear' , 'purge'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (client, message, args, Discord) => {
        try {
            if(!message.member.hasPermission("MANAGE_MESSAGES")){
                return message.reply("You don't have permission to do that.");
              }
            if (!args[0]) return message.reply("Please enter the amount of message you would like to clear.");
            if (isNaN(args[0])) return message.reply("That is not a number.");

            if (args[0] > 100) return message.reply("You cannot delete more than 100 messages.");
            if (args[0] < 1) return message.reply("You must delete atleast 1 message.")

            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages);
            });
        } 
        catch(err) {
            catchErr(err, message);
        }
    }
}
