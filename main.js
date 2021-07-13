const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});


const prefix = '?';

const fs = require('fs');

client.commands = new Discord.Collection();

client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord); 
})

client.on('guildMemberAdd', member =>{

    const ChannelId = member.guild.channels.cache.find(channel => channel.name === '📝・rules')
     
    member.guild.channels.cache.find(channel => channel.name === '👋│join-logs').send(`Welcome <@${member.user.id}> to Refund! Make sure to read ${(ChannelId)}.`)
    
})

client.on('guildMemberRemove', member =>{
     
    member.guild.channels.cache.find(channel => channel.name === '😥┃leave-logs').send(`Goodbye <@${member.user.id}>. I hope you enjoyed your visit!`)
    
})

client.login(process.env.token);