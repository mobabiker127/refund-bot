const { catchErr } = require('../commands/error');
module.exports = {
    commands: ['refund'],
    minArgs: 0,
    maxArgs: 0,
    permissions: ['ADMINISTRATOR'],
    callback: (client, message, args, Discord) => {
        try {
            message.channel.send('`We do not do refunds here.`');
        }
        catch(err) {
            catchErr(err, message);
        }
    }
}