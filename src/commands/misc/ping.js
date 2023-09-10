const { EmbedBuilder } = require("discord.js");
const { primaryColor } = require("../../../config.json")

module.exports = {
    deleted: false,
    name: 'ping',
    description: 'Replies with the bot ping.',
    devOnly: true,
    testOnly: true,
    callback: async (client, interaction) => {
        await interaction.deferReply();
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;
        const embed = new EmbedBuilder()
            .setTitle('Ping result')
            .setDescription(`Client ${ping} ms | Websocket ${client.ws.ping} ms`)
            .setColor(`${primaryColor}`)
        interaction.editReply({ embeds: [embed] });
    },
};