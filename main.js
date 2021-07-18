// 
function catchErrr(err, message) {
    client.users.cache.get("572866958156890115").send("There was an error at channel " + message.channel + " in guild " + message.guild);
    client.users.cache.get("572866958156890115").send("ERROR ```" + err + "```");
}


try {

    const Discord = require('discord.js');

    const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

    //

    const ms = require('ms');
    const prefix = '?';

    const fs = require('fs');

    const { runInContext } = require('vm');

    client.commands = new Discord.Collection();

    client.events = new Discord.Collection();

    module.exports = client;

    ['command_handler', 'event_handler'].forEach(handler => {
        require(`./handlers/${handler}`)(client, Discord);

    })


    client.on('guildMemberAdd', member => {

        const ChannelId = member.guild.channels.cache.find(channel => channel.name === '📜│server-rules')

        const welcome = member.guild.channels.cache.find(channel => channel.name === '👋│join-logs')
        welcome.send(`Welcome <@${member.user.id}> to Refund! Make sure to read ${(ChannelId)}.`)

    })

    client.on('guildMemberRemove', member => {

        const goodbye = member.guild.channels.cache.find(channel => channel.name === '😥│leave-logs')
        goodbye.send(`Goodbye <@${member.user.id}>. I hope you enjoyed your visit!`)

    })


    client.on("ready", function () {
        console.log(`Refund.`);

        const peopleIn = client.guilds.cache.get('813824410506100736').members.cache.filter(member => !member.user.bot).size;

        client.user.setPresence({
            activity: {
                name: `${peopleIn} people.`,
                type: "WATCHING"
            },
            status: 'idle'
        })
            .catch(console.error);

    }
    )
    client.on('messageReactionAdd', async (reaction, user) =>{

        const role = reaction.message.guild.roles.cache.find(r => r.name === "Customer");
    
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if(!reaction.message.guild) return;
    
        if(reaction.message.channel.id === '813826725112447077'){
            if(reaction.message.id === '866289995874959402'){
            if(reaction.emoji.name === '🍴'){
                await reaction.message.guild.members.cache.get(user.id).roles.add(role).catch(console.error);
            }  }         
        } else{
            return;
        }
    
    });
    


    client.login(process.env.token);
}

catch (err) {
    catchErrr(err, message);
}


