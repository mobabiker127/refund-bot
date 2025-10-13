module.exports = {
    commands: ['ban'],
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '<member>',
    permissions: ['BanMembers'],
    callback: (message, args, text) => {


        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
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
}
