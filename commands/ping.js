const { catchErr } = require('../commands/command_base');
module.exports = {
    commands: ['ping'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (client, message, args, Discord) => {
        try {
            message.channel.send('pong')
        }
        catch(err) {
            catchErr(err, message);
        }
    }
}