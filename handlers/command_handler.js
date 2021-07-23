const fs = require('fs')

module.exports = (Discord, client) => {
    
    function catchErr (err, message) {
        client.users.cache.get ("572866958156890115").send ("There was an error at:  ```" + message.channel.name + " | " + message.guild.name + "```");
        client.users.cache.get ("572866958156890115").send ("```" + err + "```");
    }

    module.exports = {catchErr};

    const command_files = fs.readdirSync('./commands/.').filter(file => file.endsWith('.js'));

    for(const file of command_files){
        const command = require(`../commands/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
        
    }
    
}

