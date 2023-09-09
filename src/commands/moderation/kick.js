const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, IntegrationApplication, EmbedBuilder } = require('discord.js')

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
            const embed = new EmbedBuilder()
                .setTitle('Kick summary')
                .setDescription("That user doesn't exist in this server")
                .setColor("Aqua")
            await interaction.editReply({ embeds: [embed] })
            return
        }

        if (targetUser.id === interaction.guild.ownerId) {
            const embed = new EmbedBuilder()
                .setTitle('Kick summary')
                .setDescription("You can't kick that user because they're the server owner")
                .setColor("Aqua")
            await interaction.editReply({ embeds: [embed] })
            return
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            const embed = new EmbedBuilder()
                .setTitle('Kick summary')
                .setDescription("You can't kick that user because they have same/higher role than you")
                .setColor("Aqua")
            await interaction.editReply({ embeds: [embed] })
            return
        }
        if (targetUserRolePosition >= botRolePosition) {
            const embed = new EmbedBuilder()
                .setTitle('Kick summary')
                .setDescription("I can't kick that user because they have same/higher role than me")
                .setColor("Aqua")
            await interaction.editReply({ embeds: [embed] })
            return
        }
        try {
            await targetUser.kick({ reason });
            const embed = new EmbedBuilder()
                .setTitle('Kick summary')
                .setDescription(`User ${targetUser} was kicked`)
                .setColor("Aqua")
                .addFields(
                    {
                        name: "Reason",
                        value: `${reason}`
                    }
                )
            await interaction.editReply({ embeds: [embed] })
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