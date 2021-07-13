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

    const ChannelId = '864229922376646688'
     
    guildMember.guild.channels.cache.get('813826723120152596').send(`Welcome <@${guildMember.user.id}> to Refund! Make sure to read ${guildMember.guild.channels.cache.get(ChannelId).toString()}.`)
    
})

client.login(process.env.token);
