const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  Events
} = require('discord.js');

require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
  ],
});

const hat = new Collection();

const EventEmitter = require('events')

const emitter = new EventEmitter()

EventEmitter.defaultMaxListeners = 50

const path = require('path');

const mongoose = require('mongoose');

const ms = require('ms');
const prefix = '?';
const fs = require('fs');

const { runInContext } = require('vm');

client.commands = new Collection();

client.events = new Collection();

module.exports =  { client }

// welcome message on join

/*
client.on('guildMemberAdd', member => {

    const ChannelId = member.guild.channels.cache.find(channel => channel.id = ('931470768498438194'))

    const welcome = member.guild.channels.cache.find(channel => channel.id = ('931471133268668447'))
    welcome.send(`Welcome <@${member.user.id}> to Refund! Make sure to read ${(ChannelId)}.`)
    member.roles.add(member.guild.roles.cache.find(role => role.name === "Queued"));


})

// leave message on leave

client.on('guildMemberRemove', member => {

    const goodbye = member.guild.channels.cache.find(channel => channel.name === '😥│leave-logs')
    goodbye.send(`Goodbye ${member.user.tag}. I hope you enjoyed your visit!`)

})*/

// bot handler

client.once('clientReady', async () => {
    console.log(`Refund Bot is online.`);

    const guild = client.guilds.cache.get('1187190005764980856');
    await guild.members.fetch();

    const peopleIn = guild.members.cache.filter(m => !m.user.bot).size;

    client.user.setPresence({
        activities: [{ name: `${peopleIn} people.`, type: 3 }],
        status: 'online',
        });
    const baseFile = 'command_base.js'
    const commandBase = require(`./commands/${baseFile}`)

    // Function to read command files recursively
    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));

        for (const file of files) {
            const fullPath = path.join(__dirname, dir, file);
            const stat = fs.lstatSync(fullPath);

            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else {
                const option = require(fullPath);

                if (option.commands) {
                    commandBase(client, option);
                } else {
                    console.log(`Skipping non-message command file: ${file}`);
                }
            }
        }
    };

    readCommands('commands');

}
)

/* event role reaction listener */

// reacted to message


client.on('messageReactionAdd', async (reaction, user) => {

    const gamesRole = reaction.message.guild.roles.cache.find(r => r.name === "Games");
    const moviesRole = reaction.message.guild.roles.cache.find(r => r.name === "Movies");
    const updatesRole = reaction.message.guild.roles.cache.find(r => r.name === "Updates");

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '1426594608950808576') {
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

// removed reaction

client.on('messageReactionRemove', async (reaction, user) => {

    const gamesRole = reaction.message.guild.roles.cache.find(r => r.name === "Games");
    const moviesRole = reaction.message.guild.roles.cache.find(r => r.name === "Movies");
    const updatesRole = reaction.message.guild.roles.cache.find(r => r.name === "Updates");

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '1426594608950808576') {
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

/* new member reaction listener */

client.on('messageReactionAdd', async (reaction, user) => {

    const verifyRole = reaction.message.guild.roles.cache.find(r => r.name === "Customer");
    const queuedRole = reaction.message.guild.roles.cache.find(r => r.name === "Queued")

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '1426594608950808576') {
        if (reaction.message.id === '866372822796206080') {
            if (reaction.emoji.name === '🍴') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(verifyRole).catch(console.error);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(queuedRole).catch(console.error);
            }
        }
    } else {
        return;
    }

});


// deleted message logger

/*
client.on('messageDelete', message => {
    hat.set(message.channel.id, message)

    const logChannel = client.channels.cache.get('1426594608950808576')
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
    const logChannel = client.channels.cache.get('1426594608950808576')
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
    */

 // test

(async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
        });
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error);
    }
})();

client.login(process.env.TOKEN);



// 