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
      .setTimestamp(),

      new EmbedBuilder()
      .setTitle('PopSauce')
      .setDescription('**Test your knowledge on random categories!**')
      .setColor('#353532')
      .addFields(
        { name: 'jklm', value: "https://jklm.fun/" },
      )
      .setFooter({ text: 'Refund Bot • Powered by discord.js', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp(),

      new EmbedBuilder()
      .setTitle('Type Racing')
      .setDescription('**Race other people on typing speed!**')
      .setColor('#353532')
      .addFields(
        { name: 'TypeRacer', value: "https://play.typeracer.com/" },
      )
      .setFooter({ text: 'Refund Bot • Powered by discord.js', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp(),

      new EmbedBuilder()
      .setTitle('Paint the World')
      .setDescription('**Check out and design cool pixel art on the world map!**')
      .setColor('#353532')
      .addFields(
        { name: 'Wplace', value: "https://wplace.live/" },
      )
      .setFooter({ text: 'Refund Bot • Powered by discord.js', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp(),

      new EmbedBuilder()
      .setTitle('Mini Crossword')
      .setDescription('**Complete today\'s mini crossword!**')
      .setColor('#353532')
      .addFields(
        { name: 'Seattle Times', value: "https://www.seattletimes.com/games-crossword-mini/" },
      )
      .setFooter({ text: 'Refund Bot • Powered by discord.js', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp()

    ]

    const randomEmbed = embeds[Math.floor(Math.random() * embeds.length)];

    await interaction.reply({ embeds: [randomEmbed], ephemeral: false }); 
  },
};