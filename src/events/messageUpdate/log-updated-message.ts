import {
  ChannelType,
  EmbedBuilder,
  type Message,
  type PartialMessage,
} from "discord.js";
import type { CommandKit } from "commandkit";
import { Channels } from "../../constants/channels";
import { Colors } from "../../constants/colors";

export default async function (
  oldMessage: Message<boolean> | PartialMessage,
  newMessage: Message<boolean> | PartialMessage,
  handler: CommandKit
) {
  try {
    const channel = newMessage.guild.channels.cache.get(Channels.CHANNEL_LOG);
    if (channel.type == ChannelType.GuildText) {
      const member = await newMessage.guild.members.fetch(newMessage.author.id);
      if (!member.guild.members.me) {
        const embed = new EmbedBuilder()
          .setColor(Colors.COLOR_WARNING)
          .setTitle(`A message by ${member.displayName} has been edited`)
          .setThumbnail(`${member.displayAvatarURL()}`)
          .addFields(
            { name: "From", value: `${oldMessage.content}` },
            { name: "To", value: `${newMessage.content}` },
            { name: "Location", value: `<#${newMessage.channelId}>` }
          );
        channel.send({ embeds: [embed] });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
