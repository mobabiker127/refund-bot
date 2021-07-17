module.exports = {
    name: 'rr2',
    description: "allows a user to react and receive a role.",
    permissions: ["ADMINISTRATOR"],
    async execute(client, message, args, Discord) {
        try {


            let guildID = "856174227814875147";
            let channelID = "857636392564424725";
            let emojiID = "\:fork;";
            let roleID = "856234924465586197";


            bot.on("ready", async () => {

                let guild = bot.guilds.cache.find(guild => guild.id == guildID);
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
                                                if (user.bot) return;
                                                console.log("Adding role")
                                                await reaction.message.guild.members.cache.get(user.id).roles.add(roleID)
                                            })
                                        })
                                }
                            }

                        });
                    })
                    
            });
        }
        catch(err) {
            catchErr(err, message);
        }
    }
}
