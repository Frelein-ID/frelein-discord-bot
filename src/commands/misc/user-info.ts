import "dotenv/config";
import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";
import { ApplicationCommandOptionType, EmbedBuilder, User } from "discord.js";
import { Colors } from "../../constants/colors";

export const data: CommandData = {
  name: "user-info",
  description: "Display user info",
  options: [
    {
      name: "user",
      description: "The user you to display the information",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
};

export async function run({ interaction, client, handler }: SlashCommandProps) {
  try {
    await interaction.deferReply();
    const targetUserId = interaction.options?.get("user");
    const targetUser: any = await interaction.guild.members.fetch(targetUserId);
    const targetJoinedDate = new Date(targetUser.joinedTimestamp);
    const { user, member } = interaction;
    const embed = new EmbedBuilder()
      .setColor(Colors.COLOR_PRIMARY)
      .setTitle(`${targetUser.user.globalName}'s information`)
      .setThumbnail(
        `${targetUser.displayAvatarURL({ options: { size: 256 } })}`
      )
      .addFields(
        { name: "\u200B", value: "Basic information" },
        { name: "User ID", value: `${targetUser.id}`, inline: true },
        {
          name: "Joined this server at",
          value: `${targetJoinedDate}`,
          inline: true,
        },
        { name: "\u200B", value: "User information on this server" },
        {
          name: "Roles",
          value: `${targetUser.roles.cache.map(
            (role: { id: any; name: string }) => {
              return `<@&${role.id}>`;
            }
          )}`,
          inline: true,
        },
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
