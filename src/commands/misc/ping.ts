import "dotenv/config";
import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from "commandkit";
import { EmbedBuilder } from "discord.js";

export const data: CommandData = {
  name: "ping",
  description: "Replies with the bot ping",
};

export async function run({ interaction, client, handler }: SlashCommandProps) {
  await interaction.deferReply();
  const reply = await interaction.fetchReply();
  const ping = reply.createdTimestamp - interaction.createdTimestamp;
  const embed = new EmbedBuilder()
    .setTitle("Ping result")
    .setDescription(`Client ${ping} ms | Websocket ${client.ws.ping} ms`)
    .setColor("Blue");
  interaction.editReply({ embeds: [embed] });
}

export const options: CommandOptions = {
  devOnly: true,
  guildOnly: true,
  userPermissions: ["Administrator", "AddReactions"],
  botPermissions: ["Administrator", "AddReactions"],
  deleted: false,
};
