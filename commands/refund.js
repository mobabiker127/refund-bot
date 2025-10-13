module.exports = {
    commands: ['refund'],
    minArgs: 0,
    callback: (message, args, text) => {

        message.channel.send('`No, I do not hand out refunds...`');

    }
}