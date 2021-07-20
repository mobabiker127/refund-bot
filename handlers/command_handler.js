const fs = require('fs')

module.exports = (client, Discord) => {
    
    function catchErr (err, message) {
        client.users.cache.get ("572866958156890115").send ("There was an error at channel " + message.channel + " in guild " + message.guild);
        client.users.cache.get ("572866958156890115").send ("ERROR ```" + err + "```");
    }
    function getUserFromMention (mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return client.users.cache.get(mention);
        }
    }
    module.exports = {getUserFromMention};

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

