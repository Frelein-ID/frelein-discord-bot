const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, IntegrationApplication } = require('discord.js')
const ms = require('ms')

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const mentionable = interaction.options.get('user').value;
        const duration = interaction.options.get('duration').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(mentionable)
        if (!targetUser) {
            await interaction.editReply("That user doesn't exists on this server");
            return;
        }
        if (targetUser.user.bot) {
            await interaction.editReply("I can't mute bot")
            return;
        }
        const msDuration = ms(duration)
        if (isNaN(msDuration)) {
            await interaction.editReply("Please enter a valid timeout duration")
            return;
        }
        if (msDuration < 5000 || msDuration > 2.419e9) {
            await interaction.editReply("Timeout duration cannot be less than 5 seconds or more than 28 days")
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(`You can't timeout that user because they have same/higher role than you`)
            return
        }
        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(`I can't timeout that user because they have same/higher role than me`)
            return
        }

        // Timeout user
        try {
            const { default: prettyMs } = await import('pretty-ms');

            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason)
                await interaction.editReply(`${targetUser}'s timeout has been updated to ${prettyMs(msDuration, { verbose: true })}\nReason: ${reason}`)
            }
            await targetUser.timeout({ reason });
            await interaction.editReply(`${targetUser} was timed out for ${prettyMs(msDuration, { verbose: true })}\nReason: ${reason}`)
        } catch (error) {
            console.log(`There was an error while timeouting user : ${error}`)
        }
    },
    deleted: false,
    name: 'timeout',
    description: 'timeout a user',
    devOnly: true,
    testOnly: true,
    options: [
        {
            name: 'user',
            description: 'The user you want to timeout',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'duration',
            description: 'Timeout duration (30m, 1hr, 1d)',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the timeout',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],

}