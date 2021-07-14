
module.exports = () => {

    console.log('Refund.');
    client.user.setPresence({
        activity: {
            name: `\:taco:`,
            type: "discord.gg/refund"
        },
        status: 'idle'
    })
        .catch(console.error);


}