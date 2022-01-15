const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const hat = new Discord.Collection();

const EventEmitter = require('events')

const emitter = new EventEmitter()

EventEmitter.defaultMaxListeners = 50

const path = require('path');

const mongoose = require('mongoose');

const ms = require('ms');
const prefix = '?';
const fs = require('fs');

const { runInContext } = require('vm');

client.commands = new Discord.Collection();

client.events = new Discord.Collection();

module.exports =  { 
    client,
    Discord
}


client.on('guildMemberAdd', member => {

  /*  const ChannelId = member.guild.channels.cache.find(channel => channel.name === '📜│server-rules')

    const welcome = member.guild.channels.cache.find(channel => channel.name === '👋│join-logs')
    welcome.send(`Welcome <@${member.user.id}> to Refund! Make sure to read ${(ChannelId)}.`) */
    member.roles.add(member.guild.roles.cache.find(role => role.name === "Queued"));


})

client.on('guildMemberRemove', member => {

    const goodbye = member.guild.channels.cache.find(channel => channel.name === '😥│leave-logs')
    goodbye.send(`Goodbye ${member.user.tag}. I hope you enjoyed your visit!`)

})


client.on("ready", function () {
    console.log(`Refund Bot is online.`); 

    const peopleIn = client.guilds.cache.get('813824410506100736').members.cache.filter(member => !member.user.bot).size;

    client.user.setPresence({
        activity: {
            name: `${peopleIn} people.`,
            type: "WATCHING"
        },
        status: 'online'
    })
        .catch(console.error);
    
    const baseFile = 'command_base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile){
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
            
        }
    }

    readCommands('commands')
}
)


client.on('messageReactionAdd', async (reaction, user) => {

    const gamesRole = reaction.message.guild.roles.cache.find(r => r.name === "Games");
    const moviesRole = reaction.message.guild.roles.cache.find(r => r.name === "Movies");
    const updatesRole = reaction.message.guild.roles.cache.find(r => r.name === "Updates");

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '864958460427501578') {
        if (reaction.message.id === '869570888490696755') {
            if (reaction.emoji.name === '🕹️') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(gamesRole).catch(console.error);
            }
            if (reaction.emoji.name === '🎥') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(moviesRole).catch(console.error);
            }
            if (reaction.emoji.name === '📝') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(updatesRole).catch(console.error);
            }
        }
    } else {
        return;
    }

});

client.on('messageReactionAdd', async (reaction, user) => {

    const verifyRole = reaction.message.guild.roles.cache.find(r => r.name === "Customer");
    const queuedRole = reaction.message.guild.roles.cache.find(r => r.name === "Queued")
    const ChannelId = member.guild.channels.cache.find(channel => channel.name === '📜│server-rules')
    const welcome = member.guild.channels.cache.find(channel => channel.name === '👋│join-logs')

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '813826725112447077') {
        if (reaction.message.id === '866372822796206080') {
            if (reaction.emoji.name === '🍴') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(verifyRole).catch(console.error);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(queuedRole).catch(console.error);
                welcome.send(`Welcome <@${user.id}> to Refund! Make sure to read ${(ChannelId)}.`)
            }
        }
    } else {
        return;
    }

});

client.on('messageReactionRemove', async (reaction, user) => {

    const gamesRole = reaction.message.guild.roles.cache.find(r => r.name === "Games");
    const moviesRole = reaction.message.guild.roles.cache.find(r => r.name === "Movies");
    const updatesRole = reaction.message.guild.roles.cache.find(r => r.name === "Updates");

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '864958460427501578') {
        if (reaction.message.id === '869570888490696755') {
            if (reaction.emoji.name === '🕹️') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(gamesRole).catch(console.error);
            }
            if (reaction.emoji.name === '🎥') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(moviesRole).catch(console.error);
            }
            if (reaction.emoji.name === '📝') {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(updatesRole).catch(console.error);
            }
        }
    } else {
        return;
    }

});

client.on('messageDelete', message => {
    hat.set(message.channel.id, message)

    const logChannel = client.channels.cache.get('870315818687291402')
    const deleteMessage = new Discord.MessageEmbed()
    .setTitle("Deleted message")
    .addField("Deleted message by", `${message.author} - (${message.author.id})`)
    .addField("In", message.channel)
    .addField("Content", message.content)
    .setColor("#FBA41C")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    logChannel.send(deleteMessage)
 })
 client.on('messageUpdate', async(oldMessage, newMessage) => {
    const logChannel = client.channels.cache.get('870315818687291402')
    const editedMessage = new Discord.MessageEmbed()
    .setTitle("Edited message")
    .addField("Edited message by", `${oldMessage.author} - (${oldMessage.author.id})`)
    .addField("In", oldMessage.channel)
    .addField("Before", oldMessage.content)
    .addField("After", newMessage.content)
    .setColor("#FBA41C")
    .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}))
    await logChannel.send(editedMessage)
 })


client.login(process.env.token);



// 