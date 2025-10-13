const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    commands: ['rrmovies'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['Administrator'],
    async callback(message, args, text) {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("You don't have permission to do that.");
        }
        const channel = message.guild.channels.cache.find(ch => ch.name === '📗│custom-roles')
        const moviesRole = message.guild.roles.cache.find(role => role.name === "Movies");

        const moviesEmoji = '🎥';

        let embed = EmbedBuilder()
            .setColor('#E507F3')
            .setTitle('React to this to get the Movies role.')
            .setDescription('You will be notified whenever there is a movie night!\n\n'
                + `${moviesEmoji} Movies role\n`);

        let messageEmbed = await message.channel.send({ embeds: [embed] });
        messageEmbed.react(moviesEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === moviesEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(moviesRole);
                }

            } else {
                return;
            }

        });



    }

}
