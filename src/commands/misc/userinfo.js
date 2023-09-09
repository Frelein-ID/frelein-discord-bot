const { Client, Interaction, EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField, DataResolver } = require("discord.js");
const { primaryColor } = require('../../../config.json')

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        try {
            await interaction.deferReply();

            if (!interaction.inGuild()) {
                interaction.reply({
                    content: "You can only run this command inside a server",
                    ephemeral: true,
                });
                return;
            }
            const targetUserId = interaction.options.get('user').value;
            const targetUser = await interaction.guild.members.fetch(targetUserId);
            const targetCreatedDate = new Date(targetUser.joinedTimestamp)
            const targetJoinedDate = new Date(targetUser.guild.joinedTimestamp)
            const { user, member } = interaction;
            console.log({ user, member, targetUser })

            const embed = new EmbedBuilder()
                .setColor(primaryColor)
                .setTitle(`${targetUser.user.globalName}'s information`)
                .setThumbnail(`${targetUser.displayAvatarURL({ options: { size: 256 } })}`)
                .addFields(
                    { name: "\u200B", value: "Basic information" },
                )
                .addFields(
                    { name: "User ID", value: `${targetUser.id}`, inline: true },
                    { name: "Account created at", value: `${targetCreatedDate}`, inline: true },
                    { name: "Joined this server at", value: `${targetJoinedDate}`, inline: true },
                )
                .addFields(
                    { name: "\u200B", value: "User information on this server" },
                )
                .addFields(
                    {
                        name: "Roles", value: `${targetUser.roles.cache.map((role) => {
                            if (role.name != "@everyone") {
                                return role.name
                            }
                        })}`, inline: true
                    },
                )
                .addFields(
                    { name: "\u200B", value: "\u200B" },
                )
                .setFooter({ text: `Requested by ${user.globalName} | ${user.id}`, iconURL: `${user.avatarURL()}` })

            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(error)
        }
    },
    deleted: false,
    name: 'user-info',
    description: 'Show information of this user',
    devOnly: true,
    testOnly: true,
    options: [
        {
            name: 'user',
            description: 'The user you to display the information',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
    ],
};