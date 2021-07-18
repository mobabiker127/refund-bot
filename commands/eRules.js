const message = require("../events/message");
const { catchErr } = require('../handlers/command_handler');
module.exports = {
    name: 'erules',
    description: "create an embed in a specific channel",
    permissions: ["ADMINISTRATOR"],
    execute(client, message, args, Discord) {
        try {
            const newEmbed = new Discord.MessageEmbed()
                .setColor('#fffff')
                .setTitle('\:taco:__**Refund Discord Rules**__\:taco:.')
                .setDescription('*Disclaimer: Disobeying Discord TOS will result in a permanent ban. You must follow the rules.*')
                .addFields(
                    { name: '\:one: **Advertising for communities or other discord servers is not allowed.**', value: 'This includes advertising in DMs. (Advertising in statuses are an exception.)' },
                    { name: '\:two: **Excessive spamming is not allowed.**', value: 'This includes reactions, messages and emojis.' },
                    { name: '\:three: **Use all channels for their purpose.**', value: 'This includes nsfw and bot commands.' },
                    { name: '\:four: **Unnecessary pings for staff or head chef is not allowed.**', value: 'They are busy people!' },
                    { name: '\:five: **Sending ipgrabbers or any of the sort is forbidden.**', value: 'This may result in a permanent ban.' },
                    { name: '\:six: **Having more than 2 alt accounts on refund is not allowed.**', value: "If you have an admin's approval, you may bypass this rule." },
                    { name: '\:seven: **Earraping in VCs is not allowed.**', value: 'This includes soundboards and other softwares.' },
                    { name: '‏‏‎ ‎', value: '‎‎‏‏‎ ‎\:fries: ***We hope you enjoy your visit!*** \:fries:' }

                )



            message.channel.send(newEmbed);
                
        }
        catch(err) {
            catchErr(err, message);
        }
    }


}