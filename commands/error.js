module.exports = (client, Discord) => {
    
    function catchErr (err, message) {
        client.users.cache.get ("572866958156890115").send ("There was an error at:  ```" + message.channel.name + " | " + message.guild.name + "```");
        client.users.cache.get ("572866958156890115").send ("```" + err + "```");
    }

    module.exports = {catchErr};
}