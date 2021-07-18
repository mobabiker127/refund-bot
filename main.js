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
    let guildID = "856174227814875147";
    let channelID = "857636392564424725";
    let emojiID = "\:fork;";
    let roleID = "856234924465586197";


    client.on("ready", async () => {

        let guild = client.guilds.cache.find(guild => guild.id == guildID);
        let channel = await guild.channels.cache.find(ch => ch.id == channelID)

        // You can set any limit you want, for performance I used a low number
        channel.messages.fetch({ limit: 10 })
            .then(async messages => {
                messages.forEach(async message => {
                
                    if (message.partial) await message.fetch();
                    if (!message.guild) return;

                    for (let reactionObj of message.reactions.cache) {
                        for (let reaction of reactionObj) {
                            if (typeof reaction == "string") continue;
                            if (reaction.emoji.id != emojiID) continue;
                            reaction.users.fetch()
                                .then(async users => {
                                    users.forEach(async user => {
                                        if (user.client) return;
                                        console.log("Adding role")
                                        await reaction.message.guild.members.cache.get(user.id).roles.add(roleID)
                                    })
                                })
                        }
                    }

                });
            })

    });


    client.login(process.env.token);
}

catch (err) {
    catchErrr(err, message);
}


