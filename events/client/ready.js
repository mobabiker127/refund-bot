
module.exports = () => {

    console.log('Refund.')

    let peopleIn = client.guild.members.cache;

    client.user.setPresence({
        activity: {
            name: `${peopleIn} people.`,
            type: "WATCHING"
        },
        status: 'idle'
    })
        .catch(console.error);

}