const { PermissionsBitField } = require('discord.js');

const ms = require('ms');

module.exports = {
    commands: ['mute', 'silence'],
    minArgs: 1,
    permissions: ['ManageMessages'],
    callback: (message,  args, text) => {
        
            const target = message.mentions.users.first();

            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
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
                    memberTarget.send('Your mute in Refund has expired.')
                }, ms(args[1]));

            }
            else {
                message.channel.send('Not a valid user.');
            }
        }

    }





