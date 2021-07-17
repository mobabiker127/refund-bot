module.exports = (client, Discord) => {

    client.on("ready", function () {
        console.log(`Refund.`);

        const peopleIn = client.guilds.cache.get('813824410506100736').members.cache.filter(member => !member.user.bot).size;

        const arrayOfStatus = [
            `${peopleIn} people.`,
            `discord.gg/refund 🌮`
        ];
        let index = 0;
        setInterval(() => {
            if (index === arrayOfStatus.length) index = 0;
            const status = arrayOfStatus[index];
            console.log(status);
            client.user.setActivity(status, { type: "WATCHING" }).catch(console.error)
            index++;
        }, 6000)
    })
}