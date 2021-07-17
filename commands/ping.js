const { catchErr } = require('../handlers/command_handler');
module.exports = {
    name: 'ping',
    description: "ping da pong",
    permissions: ["SEND_MESSAGES"],
    execute(client, message, args, Discord) {
        try {
            message.channel.send('pong')
        }
        catch(err) {
            catchErr(err, message);
        }
    }
}