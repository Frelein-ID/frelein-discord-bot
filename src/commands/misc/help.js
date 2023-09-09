const { EmbedBuilder } = require("discord.js");
const { primaryColor, botName, botAvatar, botUrl } = require("../../../config.json")

module.exports = {
    deleted: false,
    name: 'help',
    description: 'Show available commands list',
    devOnly: false,
    testOnly: false,
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;
        const embed = new EmbedBuilder()
            .setTitle(`${botName} Available Commands`)
            .setAuthor({ name: `${botName}`, iconURL: `${botAvatar}`, url: `${botUrl}` })
            .setColor(`${primaryColor}`)
            .addFields({
                name: "Ping",
                value: "show current bot ping"
            })

        interaction.editReply({ embeds: [embed] });
    },
};