const message = require("../events/message");

module.exports = {
    name: 'embed',
    description: "create an embed in a specific channel",
    permissions: ["ADMINISTRATOR"],
    execute(client, message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#fffff')
        .setTitle('\:taco:__**Refund Discord Rules**__\:taco:.')
        .setDescription('*Disclaimer: Anyone who disobeys Discord ToS will be banned permanently.*')
        .addFields(
            {name: '\:one: **Advertising discord servers or other communities is not allowed.**', value: 'Statuses are an exception.'},
            {name: '\:two: **Excessive spamming is not allowed.**', value: 'This includes reactions, messages and emojis.'},
            {name: '\:three: **Use all channels for their purpose.**', value: 'This includes nsfw and bot commands.'},
            {name: '\:four: **Unnecessary pings for staff or head chef is not allowed.**', value: 'This includes regular people as well.'},
            {name: '\:five: **Sending ipgrabbers or other shady links is not allowed.**', value: 'This does not include YouTube video links, etc.'},
            {name: '\:six: **Having more than 2 alt accounts on refund is not allowed.**', value: 'Unless given permission to.'},
            {name: '\:seven: **Earraping in VCs is not allowed.**', value: 'This includes other soundboards and other softwares.'},
            {name: '‏‏‎ ‎', value: '‎‎‏‏‎ ‎\:fries: ***We hope you enjoy your visit!*** \:fries:'}

        )
        
        

        message.channel.send(newEmbed);
    }

    
}    