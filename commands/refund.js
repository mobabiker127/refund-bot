
module.exports = {
    commands: ['refund'],
    minArgs: 0,
    maxArgs: 0,
    permissions: ['ADMINISTRATOR'],
    callback: (client, message, args, Discord) => {

        message.channel.send('`We do not do refunds here.`');

    }
}