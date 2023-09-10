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
            const { user, member } = interaction;
            const embed = new EmbedBuilder()
                .setColor(primaryColor)
                .setTitle(`${targetUser.user.globalName}'s Avatar`)
                .setDescription(`${targetUser.displayAvatarURL()}`)
                .setImage(`${targetUser.displayAvatarURL()}`)
                .setFooter({ text: `Requested by ${user.globalName} | ${user.id}`, iconURL: `${user.avatarURL()}` })

            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(error)
        }
    },
    deleted: false,
    name: 'user-avatar',
    description: 'Show avatar of this user',
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