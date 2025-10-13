const { PermissionsBitField } = require('discord.js');

module.exports = {
    commands: ['lock', 'lockdown'],
    minArgs: 0,
    permissions: ['ManageChannels'],
    async callback(message, args, text) {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("You don't have permission to do that.");
        }

        const role = message.guild.roles.cache.find(role => role.name === "Customer");

        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!lockChannel) lockChannel = message.channel;

        await lockChannel.permissionOverwrites.edit(role, {
            SendMessages: false
        }).catch(err => console.log(err));
        message.channel.send('Channel has been locked, silence.');


    }
}
