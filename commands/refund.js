
module.exports = {
    commands: ['refund'],
    minArgs: 0,
    callback: (message, arguments, text) => {

        message.channel.send('`We do not do refunds here.`');

    }
}