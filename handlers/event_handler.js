// new event handler

const fs = require('fs')

module.exports = (client, Discord) =>{
    fs.readdirSync('./events/').forEach(file => {
        const events = fs.readdirSync('./events/').filter((file) => file.endsWith('.js'));

        for (let file of events){
            let get = require(`../events/${file}`)

            if(get.name){
                client.events.set(get.name, get)
            } else {
                continue;
            }
            
        }
    })
}
