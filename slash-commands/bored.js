const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bored')
    .setDescription('Shows information about the Refund bot'),

  async execute(interaction) {
    const embeds = [
    new EmbedBuilder()
      .setTitle('Password Game')
      .setDescription('**Try out the password game!**')
      .setColor('#353532')
      .addFields(
        { name: 'Neal.fun', value: "https://neal.fun/password-game/" },
      )
      .setFooter({ text: 'Refund Bot • Powered by discord.js', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp(),

      new EmbedBuilder()
      .setTitle('Blackjack Command')
      .setDescription('**Test out my blackjack command!**')
      .setColor('#353532')
      .addFields(
        { name: 'Prefix:', value: "/blackjack" },
      )
      .setFooter({ text: 'Refund Bot • Powered by discord.js', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp()

    ]

    const randomEmbed = embeds[Math.floor(Math.random() * embeds.length)];

    await interaction.reply({ embeds: [randomEmbed], ephemeral: false }); 
  },
};