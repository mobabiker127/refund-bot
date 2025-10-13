
const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

client.on(Events.InteractionCreate, interaction => {
    if (interaction.commandname === "ping") {
        interaction.reply("Pong!");
    }
})