
module.exports = {
    commands: ['ping'],
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    callback: (message,  arguments, text) => {

        message.channel.send('pong')
    }



}