const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const ms = require('ms');

module.exports = {
    commands: ['mute', 'silence', 'dontspeakifurracist', 'shutthefuckup'],
    minArgs: 1,
    permissions: ["MANAGE_MESSAGES"],
    callback: (message,  args, text) => {
        
            const target = message.mentions.users.first();

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
                    memberTarget.send('Your mute in Refund has expired.')
                }, ms(args[1]));

            }
            else {
                message.channel.send('Not a valid user.');
            }
        }

    }





