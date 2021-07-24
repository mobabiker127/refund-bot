const { catchErr } = require('../commands/command_base');
module.exports = {
    commands: ['kick' , 'boot'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (client, message, args, Discord) => {
        
        try {

            if(!message.member.hasPermission("KICK_MEMBERS")){
                return message.reply("You don't have permission to do that.");
              }

            const member = message.mentions.users.first();
            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.kick();
                message.channel.send("User has been kicked.")
                    .catch(err => {
                        message.reply("Cannot kick this member.");
                        console.error(err);
                    });
            } else {
                {
                    message.channel.send('Please mention a user.');
                }
            }
        }
        catch(err) {
            catchErr(err, message);
        }
    }
    
}
