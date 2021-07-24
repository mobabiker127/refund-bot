const { catchErr } = require('./commands/command_base.js');
module.exports = {
    name: 'refund',
    description: "tells you how much we refund",
    permissions: ["SEND_MESSAGES"],
    execute(client, message, args, Discord) {
        try {
            message.channel.send('`We do not do refunds here.`');
        }
        catch(err) {
            catchErr(err, message);
        }
    }
}