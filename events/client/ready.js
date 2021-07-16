
module.exports = (client, message, args, Discord) => {

    console.log('Refund.')

    const peopleIn = message.guilds.members.filter(member => !member.user.bot).size;

    client.user.setPresence({
        activity: {
            name: `${peopleIn} people.`,
            type: "WATCHING"
        },
        status: 'idle'
    })
        .catch(console.error);

}