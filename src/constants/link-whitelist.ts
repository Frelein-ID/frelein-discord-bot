export class LinkWhitelist {
  // Link whitelist
  public static readonly LINKS = [
    "discord.com/channels",
    "cdn.discordapp.com/attachments",
    "media.discordapp.net/attachments",
  ];
  public static readonly REGEX =
    /(\b(https?|ftp|file|http?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
}
