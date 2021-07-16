
module.exports = () => {
    let peopleIn = guild.members.cache;
    console.log('Refund.')

    client.user.setPresence({
        activity: {
            name: `${peopleIn} people.`,
            type: "WATCHING"
        },
        status: 'idle'
    })
        .catch(console.error);

}