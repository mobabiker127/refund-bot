const Discord = require('discord.js');

module.exports = {
    commands: ['unmute'],
    minArgs: 1,
    maxArgs: 2,
    expectedArgs: '<member>',
    permissions: ['ManageMessages'],
    callback: (message, args, text) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("You don't have permission to do that.");
        }
        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Customer');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted.`);
        }
        else {
            message.channel.send('Not a valid user.');
        }

    }
}
