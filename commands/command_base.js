const { prefix } = require('../package.json');
const { PermissionsBitField } = require('discord.js');

const validatePermissions = (permissions) => {
    const validPermissions = Object.keys(PermissionsBitField.Flags);
    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permissions node "${permission}"`);
        }
    }
};

let recentlyRan = [];

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You do not have permission to run this command.',
        minArgs = 0,
        maxArgs = null,
        cooldown = -1,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions;

    if (typeof commands === 'string') {
        commands = [commands];
    }

    if (permissions.length) {
        if (typeof permissions === 'string') permissions = [permissions];
        validatePermissions(permissions);
    }

    client.on('messageCreate', message => {
        const { member, content, guild } = message;

        if (!guild || member.user.bot) return;

        for (const alias of commands) {
            if (!content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) continue;

            // Check permissions
            for (const permission of permissions) {
                if (!member.permissions.has(PermissionsBitField.Flags[permission])) {
                    message.reply(permissionError);
                    return;
                }
            }

            // Check roles
            for (const requiredRole of requiredRoles) {
                const role = guild.roles.cache.find(r => r.name === requiredRole);
                if (!role || !member.roles.cache.has(role.id)) {
                    message.reply(`You must have the "${requiredRole}" role to execute this command.`);
                    return;
                }
            }

            // Handle cooldowns
            const cooldownKey = `${message.author.id}-${alias}`;
            if (cooldown > 0 && recentlyRan.includes(cooldownKey)) {
                message.reply({
                    embeds: [
                        {
                            description: `Command cooldown: ${cooldown / 1000} seconds.`,
                            color: 0x000000
                        }
                    ]
                }).then(msg => setTimeout(() => msg.delete(), 5000));
                return;
            }

            // Parse arguments
            const args = content.split(/[ ]+/).slice(1);

            if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
                message.reply(`Format: ${prefix}${alias} ${expectedArgs}`);
                return;
            }

            if (cooldown > 0) {
                recentlyRan.push(cooldownKey);
                setTimeout(() => {
                    recentlyRan = recentlyRan.filter(key => key !== cooldownKey);
                }, cooldown);
            }

            if (typeof callback === 'function') {
                callback(message, args, args.join(' '));
            } else {
                console.error(`Command "${commands}" does not have a valid callback function!`);
            }

            return;
        }
    });
};
