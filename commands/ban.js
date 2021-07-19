const { catchErr } = require('../handlers/command_handler');
module.exports = {
    name: 'ban',
    description: "bans a member from the server",
    permissions: ["ADMINISTRATOR"],
    execute(client, message, args, Discord) {
        try {

            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.reply("You don't have permission to do that.");
            }
            const member = message.mentions.users.first();
            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.ban();
                message.channel.send("User has been banned.")
            } else {
                message.channel.send('Please mention a user.');
            }
        }
        catch (err) {
            catchErr(err, message);
        }
    }
}
