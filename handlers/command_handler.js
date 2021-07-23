const fs = require('fs')

const cooldowns = new Map();

module.exports = (message, client, Discord) => {
    
    function catchErr (err, message) {
        client.users.cache.get ("572866958156890115").send ("There was an error at:  ```" + message.channel.name + " | " + message.guild.name + "```");
        client.users.cache.get ("572866958156890115").send ("```" + err + "```");
    }

    module.exports = {catchErr};

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_ammount = (command.cooldown) * 1000;

    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get (message.author.id) + cooldown_amount;
        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;

            return message.reply(`You cannot use this command for ${time_left.toFixed(0)} seconds.`)
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

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

