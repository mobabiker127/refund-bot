const fs = require('fs');

module.exports = async (client, Discord, message) => {
    async function dir(dirName) {
        const files = (await fs.readdir(`./events/${dirName}`)).filter(file => file.endsWith('.js'));
        for (const file of files) {
            const event = require(`../events/${dirName}/${file}`);
            const eventName = file.split(/\./).slice(0, -1).join('.') // a.b.js => "a.b"
            client.on(eventName, event.bind(null, Discord, client));
        }
    }
    Promise.all(['client', 'guild'].map(d => dir(d)));
}
