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
    client.on(
        'messageReactionAdd',
        async (potentialPartialReaction, potentialPartialUser) => {
          try {
            const reaction = await potentialPartialReaction.fetch();
            const user = await potentialPartialUser.fetch();
          } catch (err) {
            console.log(err);
          }
      
          // can use reaction and user here!
      });
      client.on('messageReactionAdd', async (reaction, user) => {
        // When a reaction is received, check if the structure is partial
        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message: ', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }
        // Now the message has been cached and is fully available
        console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
        // The reaction is now also fully available and the properties will be reflected accurately:
        console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
    });
    


    client.login(process.env.token);
}

catch (err) {
    catchErrr(err, message);
}


