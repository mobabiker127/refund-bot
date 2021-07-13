module.exports = {
    name: 'unlock',
    description: "unlocks a channel for other users",
    permissions: ["MANAGE_MESSAGES"],
    async  execute(client, message, args, Discord) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have permissions to run this command.')

        const role = message.guild.roles.cache.get('856234924465586197');
        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if(!lockChannel) lockChannel = message.channel;

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES : true
        }).catch(err => console.log(err));
        message.channel.send('Channel has been unlocked, enjoy.');
    }
}