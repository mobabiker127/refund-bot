module.exports = {
    name: 'av',
    description: "displays a users avatar in the server",
    permissions: ["SEND_MESSAGES"],
    execute(client, message, args, Discord){
        const embed = new Discord.MessageEmbed()

        if(!message.mentions.users.first()){
            embed.setTitle("Your Avatar:")
            embed.setDescription("Your avatar is looking sexy.")
            embed.setColor("RANDOM")
            embed.setImage(message.author.displayAvatarURL())
            return message.channel.send(embed)
        }else{
            const user = message.mentions.users.first()
            embed.setTitle(`${user.tag}'s Avatar`)
            embed.setDescription(`They should really change it. `)
            embed.setColor("RANDOM")
            embed.setImage(user.displayAvatarURL())
            return message.channel.send(embed)
        }
    }
}
