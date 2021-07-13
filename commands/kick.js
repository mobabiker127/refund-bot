module.exports = {
    name: 'kick',
    description: "kicks a member from the server",
    permissions: ["KICK_MEMBERS"],
    execute(client, message, args, Discord){
        const member = message.mentions.users.first();
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.kick();
            message.channel.send("User has been kicked.")
            .catch(err => {
                message.reply("Cannot kick this member.");
                console.error(err);
            });
        }else{
                {message.channel.send('Please mention a user.');
        }
    }
}
    
}
