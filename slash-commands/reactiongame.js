const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('react')
    .setDescription('Tests your reaction speed!'),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle('Reaction Test')
      .setDescription('Get ready...')
      .setColor(0x00ae86);

    await interaction.reply({ embeds: [embed], fetchReply: true });

    // Wait 3-5 seconds
    const waitTime = Math.floor(Math.random() * 3000) + 2000;

    setTimeout(async () => {

      const startTime = Date.now();

      const newEmbed = new EmbedBuilder()
        .setTitle('⚡ Reaction Test')
        .setDescription('🚨 CLICK THE BUTTON NOW!')
        .setColor(0xff0000);

      const goodbutton = new ButtonBuilder()
        .setCustomId('good_click')
        .setLabel('click this one')
        .setStyle(ButtonStyle.Danger);

        const badbutton = new ButtonBuilder()
        .setCustomId('bad_click')
        .setLabel('not this one')
        .setStyle(ButtonStyle.Danger);

      const chosenButton = choice === 'A' ? goodbutton : badbutton

      const row = new ActionRowBuilder().addComponents(chosenButton);

      await interaction.editReply({
        embeds: [newEmbed],
        components: [row],
      });

      // Listen for the button
      const filter = i =>
        i.customId === 'react_click' && i.user.id === interaction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 10000,
        max: 1,
      });

      collector.on('collect', async i => {
        if(chosenButton.customId === 'bad_click'){
          console.log("User pressed bad button!")
          return;
        }
        const reactionTime = Date.now() - startTime;

        const resultEmbed = new EmbedBuilder()
          .setTitle('⚡ Reaction Test')
          .setDescription(`You reacted in **${reactionTime}ms** 🎉`)
          .setColor(0x00ff00);

        await i.update({ embeds: [resultEmbed], components: [] });
      });

      collector.on('end', async collected => {
        if (collected.size === 0) {
          const failEmbed = new EmbedBuilder()
            .setTitle('⚡ Reaction Test')
            .setDescription('⏰ Too slow! You didn’t click in time.')
            .setColor(0x808080);

          await interaction.editReply({ embeds: [failEmbed], components: [] });
        }
      });
    }, waitTime);
  },
};