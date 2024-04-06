import { Channels } from "../../constants/channels";
import { CommandKit } from "commandkit";
import { ChannelType, EmbedBuilder, Message, PartialMessage } from "discord.js";
import { Colors } from "../../constants/colors";

export default async function (
  message: Message<boolean> | PartialMessage,
  handler: CommandKit
) {
  try {
    const channel = message.guild.channels.cache.get(Channels.CHANNEL_LOG);
    if (channel.type == ChannelType.GuildText) {
      const member = await message.guild.members.fetch(message.author.id);
      const embed = new EmbedBuilder()
        .setColor(Colors.COLOR_DANGER)
        .setTitle(`A message by ${member.displayName} has been deleted`)
        .setThumbnail(`${member.displayAvatarURL()}`)
        .addFields(
          { name: "Message content", value: `${message.content}` },
          { name: "Deleted by", value: `<@${message.author.id}>` },
          { name: "Location", value: `<#${message.channelId}>` }
        );
      channel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.log(error);
  }
}
