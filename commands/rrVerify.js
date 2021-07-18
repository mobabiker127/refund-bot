const { catchErr } = require('../handlers/command_handler');
module.exports = {
    name: 'rrVerify',
    description: "allows a user to react and receive a role.",
    permissions: ["ADMINISTRATOR"],
    async execute(client, message, args, Discord) {
        try {
            const channel = message.guild.channels.cache.find(ch => ch.name === '📃│verification')
            const customerRole = message.guild.roles.cache.find(role => role.name === "Customer");

            const customerEmoji = '🍴';

            let embed = new Discord.MessageEmbed()
                .setColor('#EFD011')
                .setTitle('React to this to get the Customer Role.')
                .setDescription('This will allow you to access all channels in this discord server.\n\n'
                    + `${customerEmoji} Customer role.\n`);

            let messageEmbed = await message.channel.send(embed);
            messageEmbed.react(customerEmoji);

            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === customerEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(customerRole);
                    }

                } else {
                    return;
                }

            });


        }
        catch(err) {
            catchErr(err, message);
        }
    }
 
}
