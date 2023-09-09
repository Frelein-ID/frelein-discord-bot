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
                .setTitle('Ban summary')
                .setDescription("That user doesn't exist in this server")
                .setColor("Aqua")
            await interaction.editReply({ embeds: [embed] })
            return
        }

        if (targetUser.id === interaction.guild.ownerId) {
            const embed = new EmbedBuilder()
                .setTitle('Ban summary')
                .setDescription("You can't ban that user because they're the server owner")
                .setColor("Aqua")
            await interaction.editReply({ embeds: [embed] })
            return
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            const embed = new EmbedBuilder()
                .setTitle('Ban summary')
                .setDescription("You can't ban that user because they have same/higher role than you")
                .setColor("Aqua")
            await interaction.editReply({ embeds: [embed] })
            return
        }
        if (targetUserRolePosition >= botRolePosition) {
            const embed = new EmbedBuilder()
                .setTitle('Ban summary')
                .setDescription("I can't ban that user because they have same/higher role than me")
                .setColor("Aqua")
            await interaction.editReply({ embeds: [embed] })
            return
        }
        try {
            const embed = new EmbedBuilder()
                .setTitle('Ban summary')
                .setDescription(`User ${targetUser} was banned`)
                .setColor("Aqua")
                .addFields(
                    {
                        name: "Reason",
                        value: `${reason}`
                    }
                )
            await targetUser.ban({ reason });
            await interaction.editReply({ embeds: [embed] })
        } catch (error) {
            console.log(`There was an error while banning user : ${error}`)
        }
    },
    deleted: false,
    name: 'ban',
    description: 'Bans a member from this server',
    devOnly: true,
    testOnly: true,
    options: [
        {
            name: 'user',
            description: 'The user you want to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason you want to ban',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers]
}