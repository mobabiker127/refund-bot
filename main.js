const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});


const prefix = '?';

const fs = require('fs');

client.commands = new Discord.Collection();

client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord); 
})

client.on('guildMemberAdd', guildMember =>{

    const firstChannelId = '857684941776879657'
    const secondChannelId = '863793875768311829'
     
    guildMember.guild.channels.cache.get('863521433215696906').send(`Welcome <@${guildMember.user.id}> to Refund! Make sure to read ${guildMember.guild.channels.cache.get(firstChannelId).toString()} and ${guildMember.guild.channels.cache.get(secondChannelId).toString()}`)
    
})

client.login(process.env.token);
