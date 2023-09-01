const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, IntegrationApplication } = require('discord.js')

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('user').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply("That user doesn't exist in this server")
            return
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply(`You can't kick that user because they're the server owner`)
            return
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(`You can't kick that user because they have same/higher role than you`)
            return
        }
        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(`I can't kick that user because they have same/higher role than me`)
            return
        }
        try {
            await targetUser.kick({ reason });
            await interaction.editReply(`User ${targetUser} was kicked\nReason: ${reason}`)
        } catch (error) {
            console.log(`There was an error while kicking user : ${error}`)
        }
    },
    deleted: false,
    name: 'kick',
    description: 'Kick a member from this server',
    devOnly: true,
    testOnly: true,
    options: [
        {
            name: 'user',
            description: 'The user you want to kick',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason you want to kick',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers]
}