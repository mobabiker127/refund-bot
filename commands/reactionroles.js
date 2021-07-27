const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: ['reactionroles'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    async callback(message, arguments, text) {

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("You don't have permission to do that.");
        }
        const channel = message.guild.channels.cache.find(ch => ch.name === '📗│custom-roles')
        const gamesRole = message.guild.roles.cache.find(role => role.name === "Games");
        const moviesRole = message.guild.roles.cache.find(role => role.name === "Movies");

        const gamesEmoji = '🕹️';
        const moviesEmoji = '🎥';

        let embed = new Discord.MessageEmbed()
            .setColor('#363535')
            .setTitle('Use the reactions below to obtain roles.')
            .setDescription('Obtaining roles will allow you to be notified about specific events & updates!\n\n'
                + `${moviesEmoji} Movies role\n`
                + `${gamesEmoji} Games role`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(moviesEmoji);
        messageEmbed.react(gamesEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === moviesEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(moviesRole);
                }
                if (reaction.emoji.name === gamesEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(gamesRole);
                }
            } else {
                return;
            }

        }

                



        )
    
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === moviesEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(moviesRole);
                }
                if (reaction.emoji.name === gamesEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(gamesRole);
                }
            } else {
                return;
            }

        }

                



        )}
        
        
}