import "dotenv/config";
import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";
import { EmbedBuilder } from "discord.js";
import { Colors } from "../../constants/colors";

export const data: CommandData = {
  name: "server-info",
  description: "Display server info",
};

export async function run({ interaction, client, handler }: SlashCommandProps) {
  try {
    await interaction.deferReply();
    const { user, guild } = interaction;
    const owner = await guild.fetchOwner();
    const embed = new EmbedBuilder()
      .setColor(Colors.COLOR_PRIMARY)
      .setAuthor({ name: guild.name, iconURL: guild.iconURL({ size: 256 }) })
      .addFields(
        {
          name: "Owner",
          value: owner.user.tag,
          inline: true,
        },
        {
          name: "Server ID",
          value: `${guild.id}`,
          inline: true,
        },
        {
          name: "Server Creation Date",
          value: `${guild.createdAt.toDateString()}`,
          inline: true,
        },
        {
          name: "Text Channels",
          value: `${
            guild.channels.cache.filter((c) => c.type === 0).toJSON().length
          }`,
          inline: true,
        },
        {
          name: "Voice Channels",
          value: `${
            guild.channels.cache.filter((c) => c.type === 2).toJSON().length
          }`,
          inline: true,
        },
        {
          name: "Category Channels",
          value: `${
            guild.channels.cache.filter((c) => c.type === 4).toJSON().length
          }`,
          inline: true,
        },
        {
          name: "Members",
          value: `${guild.memberCount}`,
          inline: true,
        },
        {
          name: "Roles",
          value: `${guild.roles.cache.size}`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true },
        { name: "\u200B", value: "\u200B" }
      )
      .setFooter({
        text: `Requested by ${user.globalName}`,
        iconURL: `${user.avatarURL()}`,
      });
    interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.log(error);
  }
}

export const options: CommandOptions = {
  devOnly: true,
  guildOnly: true,
  userPermissions: ["Administrator", "AddReactions"],
  botPermissions: ["Administrator", "AddReactions"],
  deleted: false,
};
