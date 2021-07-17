module.exports = {
    name: 'status',
    description: "sets bot statud",
    permissions: ["ADMINISTRATOR"],
    async execute(client, Discord) {
        
        client.user.setActivity('Test')
    }
}