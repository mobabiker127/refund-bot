const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('steam')
    .setDescription('Check Players Steam Profile')
    .addStringOption(option =>
      option
        .setName('username')
        .setDescription('Steam user ID')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const username = interaction.options.getString('username');
    const tag = interaction.options.getString('tag');

    // Build SteamURL
    const url = `https://steamcommunity.com/profiles/${username}`;

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

      const user = $('span.actual_persona_name').first()?.text()?.trim() || 'Username not found';


      // Ask Groq to extract recent games
      const completion1 = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content:
              'From the provided text, list the most recent games the user has played.',
          },
          {
            role: 'user',
            content: pageText,
          },
        ],
      });

      const completion2 = await groq.chat.completions.create({
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

      const games = completion1.choices[0].message.content.trim();
      const description = completion2.choices[0].message.content.trim();

      const embed = new EmbedBuilder()
        .setTitle('Steam Profile Review')
        .setDescription(`**Player:** ${user}`)
        .addFields({
          name: 'Games',
          value: games,
        })
        .addFields({
          name: 'Description',
          value: description,
        })
        .setColor(0xff4655)
        .setFooter({ text: 'Data via Steam' });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error.message);

      await interaction.editReply(
        'Could not fetch player stats. Steam likely blocked the request.'
      );
    }
  },
};
