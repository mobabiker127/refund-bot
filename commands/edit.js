const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['edit'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    async callback(message, arguments, text) {

        const gamesEmoji = '🕹️';

        let embed = new Discord.MessageEmbed()
            .setColor('#56F307')
            .setTitle('React to this to get the Games role.')
            .setDescription('You will be notified whenever there is a game night!\n\n' + `${gamesEmoji} Games role\n`)
        message.channel.messages.fetch('866369346473164822')
        .then(msg => {
            const embededit = msg.first()
            embededit.edit(embed);
           
        })
    }
}