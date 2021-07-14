function catchErr (err, message) {
    client.users.get ("572866958156890115").send ("There was an error at channel " + message.channel + " in guild " + message.guild)
    client.users.get ("572866958156890115").send ("ERROR ```" + err + "```");
}
module.exports = { e };