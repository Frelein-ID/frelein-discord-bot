const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    deleted: false,
    name: "clear",
    description: "Clear some messages",
    devOnly: true,
    testOnly: true,
    options: [
        {
            name: "total-messages",
            description: "how many messages will be cleared",
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
}