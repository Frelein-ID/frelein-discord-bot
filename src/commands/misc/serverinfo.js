const { Client, Interaction, EmbedBuilder } = require("discord.js");
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
            const { user, guild } = interaction;
            const owner = await guild.fetchOwner();
            const embed = new EmbedBuilder()
                .setColor(primaryColor)
                .setAuthor({ name: guild.name, iconURL: guild.iconURL({ size: 256 }) })
                .addFields(
                    {
                        name: "Owner",
                        value: owner.user.tag,
                        inline: true
                    },
                    {
                        name: "Server ID",
                        value: `${guild.id}`,
                        inline: true
                    },
                    {
                        name: "Server Creation Date",
                        value: `${guild.createdAt.toDateString()}`,
                        inline: true
                    },
                    {
                        name: "Text Channels",
                        value: `${guild.channels.cache.filter((c) => c.type === 0).toJSON().length}`,
                        inline: true
                    },
                    {
                        name: "Voice Channels",
                        value: `${guild.channels.cache.filter((c) => c.type === 2).toJSON().length}`,
                        inline: true
                    },
                    {
                        name: "Category Channels",
                        value: `${guild.channels.cache.filter((c) => c.type === 4).toJSON().length}`,
                        inline: true
                    },
                    {
                        name: "Members",
                        value: `${guild.memberCount}`,
                        inline: true
                    },
                    {
                        name: "Roles",
                        value: `${guild.roles.cache.size}`,
                        inline: true
                    },
                    { name: "\u200B", value: "\u200B", inline: true },
                    { name: "\u200B", value: "\u200B" },
                )
                .setFooter({ text: `Requested by ${user.globalName} | ${user.id}`, iconURL: `${user.avatarURL()}` })
            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(error)
        }
    },
    deleted: false,
    name: 'server-info',
    description: 'Show information of this server',
    devOnly: false,
    testOnly: false,
};