import "dotenv/config";
import { Client } from "discord.js";
import { CommandKit } from "commandkit";
import { Config } from "./constants/config";
import path = require("path");

const client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"],
});

new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  devGuildIds: Config.DEV_GUILD_IDS,
  devUserIds: Config.DEV_USER_IDS,
  devRoleIds: Config.DEV_ROLE_IDS,
  skipBuiltInValidations: true,
});

client.login(process.env.TOKEN);
