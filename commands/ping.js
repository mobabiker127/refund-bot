
module.exports = {
    commands: ['ping'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (client, message, args, Discord) => {

        message.channel.send('pong')
    }



}