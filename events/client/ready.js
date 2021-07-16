
module.exports = (client, message, args, Discord) => {

    console.log('Refund.')

    const peopleIn = message.guilds.members

    message.user.setPresence({
        activity: {
            name: `${peopleIn} people.`,
            type: "WATCHING"
        },
        status: 'idle'
    })
        .catch(console.error);

}