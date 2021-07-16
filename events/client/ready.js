
module.exports = { 
    execute(client, message, args, Discord) {
    console.log('Refund.')

    const peopleIn = client.guilds.cache.size

    client.user.setPresence({
        activity: {
            name: `${peopleIn} people.`,
            type: "WATCHING"
        },
        status: 'idle'
    })
        .catch(console.error);

}
}