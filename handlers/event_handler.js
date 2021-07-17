const fs = require('fs')

module.exports = (client, Discord) =>{
    fs.readdirSync(`./events/${dirs}`).forEach(file => {
        const events = fs.readdirSync(`./events/${dirs}`).filter((files) => files.endsWith('.js'));

        for (let files of events){
            let get = require(`../events/${dirs}/${file}`)

            if(get.name){
                client.events.set(get.name, get)
            } else {
                continue;
            }
            
        }
    })
}

