
module.exports = (client, Discord) => {

    console.log('Refund.')

    let peopleIn = client.guild.get('813824410506100736').members.cache;

    client.user.setPresence({
        activity: {
            name: `${peopleIn} people.`,
            type: "WATCHING"
        },
        status: 'idle'
    })
        .catch(console.error);

}