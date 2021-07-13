module.exports = {
    name: 'ban',
    description: "bans a member from the server",
    permissions: ["ADMINISTRATOR"],
    execute(client, message, args, Discord){
        const member = message.mentions.users.first();
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.ban();
            message.channel.send("User has been banned.")
        }else{
             message.channel.send('Please mention a user.');
        }
    }
}
