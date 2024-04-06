import {
  Channel,
  DMChannel,
  GuildChannel,
  PermissionFlagsBits,
  ThreadChannel,
} from "discord.js";

export class PermissionUtils {
  public static canSend(
    channel: Channel,
    embedLinks: boolean = false
  ): boolean {
    if (channel instanceof DMChannel) {
      return true;
    } else if (
      channel instanceof GuildChannel ||
      channel instanceof ThreadChannel
    ) {
      let channelPerms = channel.permissionsFor(channel.client.user);
      if (!channelPerms) {
        // This can happen if the guild disconnected while a collector is running
        return false;
      }

      // VIEW_CHANNEL - Needed to view the channel
      // SEND_MESSAGES - Needed to send messages
      // EMBED_LINKS - Needed to send embedded links
      return channelPerms.has([
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.SendMessages,
        ...(embedLinks ? [PermissionFlagsBits.EmbedLinks] : []),
      ]);
    } else {
      return false;
    }
  }
}
