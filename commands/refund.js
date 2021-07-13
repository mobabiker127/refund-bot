module.exports= {
    name: 'refund',
    description: "tells you how much we refund",
    permissions: ["SEND_MESSAGES"],
    execute(client, message, args, Discord){
        message.channel.send('We do not do refunds here.');
    }
}