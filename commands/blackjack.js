module.exports = {
    commands: ['blackjack'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['Administrator'],
    callback: (message, args, text) => {

        const cards = [
            "hearts"["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
            "spades"["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
            "clubs"["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
            "diamonds"["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
        ];
        
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("You don't have permission to do that.");
        }

        const randomCard = cards[Math.floor(Math.random() * cards.length)];

        const realRandomCard = cards[randomCard];

        message.channel.send(realRandomCard);


    }
}