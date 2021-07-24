const { catchErr } = require('./commands/command_base.js');
module.exports = {
    name: 'rrgames',
    description: "allows a user to react and receive a role.",
    permissions: ["ADMINISTRATOR"],
    async execute(client, message, args, Discord) {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.reply("You don't have permission to do that.");
            }
            const channel = message.guild.channels.cache.find(ch => ch.name === '📗│custom-roles')
            const gamesRole = message.guild.roles.cache.find(role => role.name === "Games");

            const gamesEmoji = '🕹️';

            let embed = new Discord.MessageEmbed()
                .setColor('#56F307')
                .setTitle('React to this to get the Games Role.')
                .setDescription('You will be notified whenever there is a game night!\n\n'
                    + `${gamesEmoji} Games role\n`);

            let messageEmbed = await message.channel.send(embed);
            messageEmbed.react(gamesEmoji);

            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === gamesEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(gamesRole);
                    }

                } else {
                    return;
                }

            });


        }
        catch (err) {
            catchErr(err, message);
        }
    }

}
