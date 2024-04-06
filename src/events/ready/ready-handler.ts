import { CommandKit } from "commandkit";
import { Client } from "discord.js";

export default function (client: Client<true>, handler: CommandKit) {
  console.log(`${client.user.tag} is online.`);
}
