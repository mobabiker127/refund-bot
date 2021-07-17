module.exports = {
    name: 'status',
    description: "sets bot status",
    permissions: ["ADMINISTRATOR"],
    async execute(client, Discord) {

        const peopleIn = client.guilds.cache.get('813824410506100736').members.cache.filter(member => !member.user.bot).size;

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
