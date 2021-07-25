const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

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

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected to the database.')
}).catch((err) => {
    console.log(err);
});


client.on('guildMemberAdd', member => {

    const ChannelId = member.guild.channels.cache.find(channel => channel.name === '📜│server-rules')

    const welcome = member.guild.channels.cache.find(channel => channel.name === '👋│join-logs')
    welcome.send(`Welcome <@${member.user.id}> to Refund! Make sure to read ${(ChannelId)}.`)
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
        status: 'idle'
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

    const customerRole = reaction.message.guild.roles.cache.find(r => r.name === "Customer");

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '813826725112447077') {
        if (reaction.message.id === '866372822796206080') {
            if (reaction.emoji.name === '🍴') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(customerRole).catch(console.error);
            }
        }
    } else {
        return;
    }

});

client.on('messageReactionAdd', async (reaction, user) => {

    const gamesRole = reaction.message.guild.roles.cache.find(r => r.name === "Games");

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '864958460427501578') {
        if (reaction.message.id === '866374386888998933') {
            if (reaction.emoji.name === '🕹️') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(gamesRole).catch(console.error);
            }
        }
    } else {
        return;
    }

});

client.on('messageReactionAdd', async (reaction, user) => {

    const moviesRole = reaction.message.guild.roles.cache.find(r => r.name === "Movies");

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === '864958460427501578') {
        if (reaction.message.id === '866374372272766987') {
            if (reaction.emoji.name === '🎥') {
                await reaction.message.guild.members.cache.get(user.id).roles.add(moviesRole).catch(console.error);
            }
        }
    } else {
        return;
    }

});



client.login(process.env.token);



// 