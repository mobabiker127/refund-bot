const fs = require('fs')

module.exports = (client, Discord) => {

    const command_files = fs.readdirSync('./commands/.').filter(file => file.endsWith('.js'));

    for(const file of command_files){
        const command = require(`../commands/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
        function catchErr (err, message) {
            client.users.cache.get ("572866958156890115").send ("There was an error at channel " + message.channel + " in guild " + message.guild);
            client.users.get ("572866958156890115").send ("ERROR ```" + err + "```");
        }
    
        module.exports = {catchErr};
    }
    
}

