const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, IntegrationApplication, EmbedBuilder } = require('discord.js')
const ms = require('ms')

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const mentionable = interaction.options.get('user').value;
        const duration = interaction.options.get('duration').value; // 1d, 1 day, 1s 5s, 5m
        const reason = interaction.options.get('reason')?.value || 'No reason provided';

        await interaction.deferReply();
        const { user } = interaction

        const targetUser = await interaction.guild.members.fetch(mentionable);

        if (!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }

        if (targetUser.user.bot) {
            await interaction.editReply("I can't timeout a bot.");
            return;
        }

        const msDuration = ms(duration);
        if (isNaN(msDuration)) {
            await interaction.editReply('Please provide a valid timeout duration.');
            return;
        }

        if (msDuration < 5000 || msDuration > 2.419e9) {
            await interaction.editReply('Timeout duration cannot be less than 5 seconds or more than 28 days.');
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
        const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("You can't timeout that user because they have the same/higher role than you.");
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't timeout that user because they have the same/higher role than me.");
            return;
        }

        // Timeout the user
        try {
            const { default: prettyMs } = await import('pretty-ms');

            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${targetUser.user.globalName}'s timeout has been updated`, iconURL: `${targetUser.displayAvatarURL({ size: 256 })}` })
                    .addFields(
                        {
                            name: "Duration",
                            value: `${prettyMs(msDuration, { verbose: true })}`
                        },
                        {
                            name: "Reason",
                            value: `${reason}`
                        }
                    )
                    .setFooter({ text: `Timeouted by ${user.globalName} | ${user.id}`, iconURL: `${user.avatarURL()}` })
                await interaction.editReply({ embeds: [embed] });
                return;
            }

            await targetUser.timeout(msDuration, reason);

            const embed = new EmbedBuilder()
                .setAuthor({ name: `${targetUser.user.globalName} has been timeouted`, iconURL: `${targetUser.displayAvatarURL({ size: 256 })}` })
                .addFields(
                    {
                        name: "Duration",
                        value: `${prettyMs(msDuration, { verbose: true })}`
                    },
                    {
                        name: "Reason",
                        value: `${reason}`
                    }
                )
                .setFooter({ text: `Timeouted by ${user.globalName} | ${user.id}`, iconURL: `${user.avatarURL()}` })
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(`There was an error when timing out: ${error}`);
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