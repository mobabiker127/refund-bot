// new event handler

const fs = require('fs')

module.exports = (client, Discord) =>{
    fs.readdirSync('./events/').forEach(file => {
        const events = fs.readdirSync('./events/').filter((files) => files.endsWith('.js'));

        for (let files of events){
            let get = require(`../events/${files }`)

            if(get.name){
                client.events.set(get.name, get)
            } else {
                continue;
            }
            
        }
    })
}
