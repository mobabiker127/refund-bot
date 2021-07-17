const { catchErr } = require('../handlers/command_handler');
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