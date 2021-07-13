const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});


const prefix = '?';

const fs = require('fs');

client.commands = new Discord.Collection();

client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord); 
})

client.on('guildMemberAdd', (member) =>{

    const channelId = member.guild.channels.cache.find(ch => ch.name === '\:wave:│join-logs')
    const ruleID = member.guild.channels.cache.find(ch => ch.name === '\:pencil:・rules')
    const guild = member.guild.id
     
    const welcome = guildMember.guild.channels.cache.send(`Welcome <@${guildMember.user.id}> to ${member.guild.name}! Make sure to read ${guildMember.guild.channels.cache.get(ruleID).toString()}.`)
    const role = member.guild.roles.cache.find(role => role.name === 'Queued')
    member.roles.add(role)
    channelId.send(welcome)
})




client.login(process.env.token);
