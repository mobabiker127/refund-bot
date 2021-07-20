const ms = require('ms');
const { catchErr } = require('../handlers/command_handler');
const { getUserFromMention } = require('../handlers/command_handler');

module.exports = {
    name: 'mute',
    description: "Mutes a member in the server.",
    permissions: ["MANAGE_MESSAGES"],
    execute(client, message, args, Discord) {

        try {

            const target = getUserFromMention(args[0]);

            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                return message.reply("You don't have permission to do that.");
            }

            if (target) {

                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

                let memberTarget = message.guild.members.cache.get(target.id);

                if (!args[1]) {
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(`<@${memberTarget.user.id}> has been muted indefinitely.`);
                    return
                }
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}.`);

                setTimeout(function () {
                    memberTarget.roles.remove(muteRole.id);
                }, ms(args[1]));

            }
            else {
                message.channel.send('Not a valid user.');
            }
        }
        catch (err) {
            catchErr(err, message);
        }
    }



}
