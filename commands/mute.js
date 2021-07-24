const ms = require('ms');
const { catchErr } = require('../commands/error');
module.exports = {
    commands: ['mute' , 'silence'],
    minArgs: 1,
    maxArgs: 3,
    permissions: ['ADMINISTRATOR'],
    callback: (client, message, args, Discord) => {

        try {

            const target = message.mentions.members.first();

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