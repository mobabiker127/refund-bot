client.on('guildMemberAdd', guildMember =>{

    const channelId = member.guild.channels.cache.find(ch => ch.name === '\:wave:│join-logs')
    const ruleID = member.guild.channels.cache.find(ch => ch.name === '\:pencil:・rules')
    const guild = member.guild.id
     
    const welcome = guildMember.guild.channels.cache.send(`Welcome <@${guildMember.user.id}> to <@${guild.id}! Make sure to read ${guildMember.guild.channels.cache.get(ruleID).toString()}.`)
    const role = member.guild.roles.cache.find(role => role.name === 'Queued')
    member.roles.add(role)
    channelId.send(welcome)
})