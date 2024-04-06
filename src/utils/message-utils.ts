import {
  BaseMessageOptions,
  DiscordAPIError,
  EmbedBuilder,
  Message,
  TextBasedChannel,
  User,
} from "discord.js";

export class MessageUtils {
  public static async send(
    target: User | TextBasedChannel,
    content: string | EmbedBuilder | BaseMessageOptions
  ): Promise<Message> {
    try {
      let options: BaseMessageOptions =
        typeof content === "string"
          ? { content }
          : content instanceof EmbedBuilder
          ? { embeds: [content] }
          : content;
      return await target.send(options);
    } catch (error) {
      if (error instanceof DiscordAPIError && typeof error.code == "number") {
        return;
      } else {
        throw error;
      }
    }
  }
  public static filterLink(content: string, filter: string): Boolean {
    try {
      return;
    } catch (error) {
      throw error;
    }
  }
}
