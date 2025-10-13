const { Client, Events, SlashCommandBuilder } = require('discord.js');

const client = new Client({ intents: [] });

client.on(Events.InteractionCreate, interaction => {
    if (interaction.commandname === "ping") {
        interaction.reply("Pong!");
    }
})