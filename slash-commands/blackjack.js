const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// setting up deck of cards

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

// building the deck

const deck = [];

for (const suit of suits) {
  for (const value of values) {
    deck.push(`${value} of ${suit}`);
  }
}

// select random card from deck

function selectCard(deck) {
    let newCard = deck[Math.floor(Math.random() * deck.length)];
    const index = deck.indexOf(newCard);
    if (index > -1) {
    deck.splice(index, 1);
    }
    return newCard;
}



// executing command

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blackjack')
    .setDescription('Initiate a game of blackjack'),

    
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};