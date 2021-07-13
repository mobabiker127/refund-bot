module.exports= {
    name: 'ping',
    description: "ping da pong",
    permissions: ["SEND_MESSAGES"],
    execute(client, message, args, Discord){
            message.channel.send('pong')
    }
}