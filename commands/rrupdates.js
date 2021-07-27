const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['rrupdates'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    async callback(message, arguments, text) {

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You don't have permission to do that.");
        }
        message.delete(1000)
        const channel = message.guild.channels.cache.find(ch => ch.name === '📗│custom-roles')
        const updatesRole = message.guild.roles.cache.find(role => role.name === "Updates");

        const updatesEmoji = '📝';

        let embed = new Discord.MessageEmbed()
            .setColor('#39d3bb')
            .setTitle('React to this to get the Updates role.')
            .setDescription('You will be notified whenever there is an update in the server!\n\n'
                + `${updatesEmoji} Updates role\n`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(updatesEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === updatesEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(updatesRole);
                }

            } else {
                return;
            }

        });



    }

}