const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows information about the Refund bot'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Refund Bot')
      .setDescription('A multi-purpose bot built with **Discord.js v14**.')
      .setColor('#353532')
      .addFields(
        { name: 'Creator', value: 'asleepening', inline: true },
        { name: 'Version', value: '1.0.0', inline: true },
        { name: 'Prefix', value: '`?`', inline: true },
      )
      .addFields(
        { name: '?avatar, ?av', value: "Displays your or a mentioned user's avatar." },
        { name: '?ping', value: "Displays the bot's ping." },
        { name: '?refund', value: 'Displays a message describing on how we refund.' },
        { name: '?suggest, ?suggestion', value: 'Sends a suggestion into our suggestion channel.' }
      )
      .setFooter({ text: 'Refund Bot • Powered by discord.js', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false }); 

  },
};