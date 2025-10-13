module.exports = {
    commands: ['unlock'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ManageChannels'],
    async callback(message, args, text) {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send('You do not have permissions to run this command.')

        const role = message.guild.roles.cache.find(role => role.name === "Customer");
        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!lockChannel) lockChannel = message.channel;

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: true
        }).catch(err => console.log(err));
        message.channel.send('Channel has been unlocked, enjoy.');

    }
}
