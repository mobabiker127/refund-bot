module.exports = {
    commands: ['kick', 'boot'],
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '<member>',
    permissions: ['KickMembers'],
    callback: (message, args, text) => {



        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
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

}
