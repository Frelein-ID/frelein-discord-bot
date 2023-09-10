const { Client } = require('discord.js');
const { channelIdWelcome } = require('../../../config.json')

module.exports = (client) => {
    /**
     * 
     * @param {Client} client 
     */
    client.on("guildMemberAdd", (member) => {
        try {
            // console.log({ member })
            const message = `Hi <@${member.id}>, welcome to our server!`;
            const channel = member.guild.channels.cache.get(channelIdWelcome);
            channel.send(message);
        } catch (error) {
            console.log(error)
        }
    })
}