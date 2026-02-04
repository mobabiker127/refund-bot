const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const groq = require('../utils/groq');
const fetchDailyWebsite = require('../utils/fetchWebsite');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('news')
    .setDescription('Get the latest tech news!'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const websiteText = await fetchDailyWebsite();

      if (!websiteText || websiteText.length < 100) {
        return interaction.editReply('❌ Could not read today’s content.');
      }

      const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `
            You summarize a website that updates daily.
            Be concise.
            Focus only on today's new information.
            Return 3–5 bullet points.
          `.trim()
          },
          {
            role: 'user',
            content: websiteText
          }
        ],
      });

      const summary = completion.choices[0].message.content;

      const embed = new EmbedBuilder()
        .setTitle('💻 Latest tech news! 💻')
        .setDescription(summary.slice(0, 4000))
        .setColor(0x5865F2)
        .setFooter({ text: 'Tech news daily • Powered by Refund Bot' })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      await interaction.editReply('Failed to generate today’s news.');
    }
  },
};
