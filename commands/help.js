const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['help'],
    minArgs: 0,
    callback: (message, args, text) => {

        message.channel.send('Check DMs for our current available commands.')

        const newEmbed = new Discord.MessageEmbed()

            .setColor('#353532')
            .setTitle('\**__Refund Bot discord commands__**')
            .addFields(
                { name: '?avatar, ?av', value: "Displays your or a mentioned user's avatar." },
                { name: '?ping', value: "Displays the bot's ping." },
                { name: '?refund', value: 'Displays a message describing on how we refund.' },
                { name: '?suggest, ?suggestion', value: 'Sends a suggestion into our suggestion channel.' }


            )
        message.author.send(newEmbed)
    }

}