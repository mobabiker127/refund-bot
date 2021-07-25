
module.exports = {
    commands: ['ping'],
    minArgs: 0,
    callback: (message,  arguments, text) => {

        message.channel.send('pong')
    }



}