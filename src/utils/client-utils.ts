import { Client, Guild, NewsChannel, TextChannel } from "discord.js";
import { PermissionUtils } from "./permission-utils";

export class ClientUtils {
  public static async findNotifyChannel(
    guild: Guild
  ): Promise<TextChannel | NewsChannel> {
    // Prefer the system channel
    let systemChannel = guild.systemChannel;
    if (systemChannel && PermissionUtils.canSend(systemChannel, true)) {
      return systemChannel;
    }

    // Otherwise look for a bot channel
    return (await guild.channels.fetch()).find(
      (channel) =>
        (channel instanceof TextChannel || channel instanceof NewsChannel) &&
        PermissionUtils.canSend(channel, true)
    ) as TextChannel | NewsChannel;
  }
}
