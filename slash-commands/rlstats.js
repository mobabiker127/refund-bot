const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rlstats')
    .setDescription('Check Players Rocket League Stats (EPIC GAMES ONLY!!!)')
    .addStringOption(option =>
      option
        .setName('username')
        .setDescription('Epic games ID')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const username = interaction.options.getString('username');
    const tag = interaction.options.getString('tag');

    // Build RLStats URL
    const url = `https://rlstats.net/profile/Epic/${username}`;

    try {
      // Fetch page
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 10000,
      });

      // Load HTML
      const $ = cheerio.load(response.data);

      // Remove junk
      $('script, style, noscript').remove();

      // Extract visible text
      const pageText = $('body')
        .text()
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 12000);

      if (!pageText || pageText.length < 100) {
        throw new Error('No readable content found');
      }


      const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content:
              'From the provided text, list general information about the player in one paragraph.',
          },
          {
            role: 'user',
            content: pageText,
          },
        ],
      });

      const description = completion.choices[0].message.content.trim();

      const embed = new EmbedBuilder()
        .setTitle('Rocket League Profile Review')
        .setDescription(`**Player:** ${username}`)
        .addFields({
          name: 'Description',
          value: description,
        })
        .setColor(0xff4655)
        .setFooter({ text: 'Data via rlstats.net' });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error.message);

      await interaction.editReply(
        'Could not fetch player stats. rlstats likely blocked the request.'
      );
    }
  },
};
