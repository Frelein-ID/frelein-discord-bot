import {
  Client,
  GuildMember,
  TextChannel,
  EmbedBuilder,
  Message,
  PartialMessage,
} from "discord.js";
import type { CommandKit } from "commandkit";
import { LinkWhitelist } from "../../constants/link-whitelist";
import { Channels } from "../../constants/channels";
import { Colors } from "../../constants/colors";

export default async function (
  message: Message<boolean> | PartialMessage,
  handler: CommandKit
) {
  var archived_message: string = null;
  var banned_link: string[] = null;
  var member: GuildMember;
  // fetch owner id
  const owner = message.guild.ownerId;
  // check if the sender is guild owner or not
  try {
    if (message.author.id != owner) {
      // check if message contains link
      if (
        message.content.includes("https://") ||
        message.content.includes("http://") ||
        message.content.includes("www.")
      ) {
        var urls = message.content.match(LinkWhitelist.REGEX);
        if (urls != null) {
          var condition = urls.every(
            (url) =>
              url.includes("cdn.discordapp.com") ||
              url.includes("media.discordapp.net") ||
              url.includes("discord.com/channels")
          );
          if (!condition) {
            archived_message = message.content;
            banned_link = urls.filter(
              (url) =>
                url.includes("cdn.discordapp.com") &&
                url.includes("media.discordapp.net")
            );

            // get data
            member = await message.guild.members.fetch(message.author.id);
            const targetUserRolePosition = member.roles.highest.position;
            const botRolePosition =
              message.guild.members.me.roles.highest.position;

            // define the log channel
            const channel: TextChannel = member.guild.channels.cache.get(
              Channels.CHANNEL_LOG
            ) as TextChannel;
            // define embed log
            const embedLog = new EmbedBuilder()
              .setColor(Colors.COLOR_SUCCESS)
              .setTitle(`${member.user.globalName} has been timeouted`)
              .setThumbnail(`${member.displayAvatarURL()}`)
              .addFields(
                { name: "Reason", value: "Posted non-whitelisted links" },
                { name: "Message content", value: archived_message },
                { name: "Posted at", value: `<#${message.channelId}>` }
              );
            // define embed DM
            const embedDM = new EmbedBuilder()
              .setColor(Colors.COLOR_DANGER)
              .setTitle(`Warning ⚠️`)
              .setDescription(
                `Sorry, you have been timed out for 1 day as you sent a link that is prohibited on the server. Please exercise caution in the future. The link you sent will appear below. If you believe this was a false warning, feel free to contact the administrator. The admin maintains a message log and will review your message.\n\nすみません、ただいま1日間のタイムアウトを受けています。サーバー上で禁止されているリンクを送信したためです。今後は注意してください。送信したリンクは以下に表示されます。もし誤った警告だと思われる場合は、管理者にお気軽にご連絡ください。管理者はメッセージログを保持しており、メッセージを再確認いたします。\n\nThe link you sent: ${archived_message}`
              );
            try {
              // check member exist
              if (!member) {
                const message = "That user doesn't exist in this server.";
                channel.send(message);
                return;
              }
              // check member is bot
              if (member.user.bot) {
                const message = "I can't timeout a bot.";
                channel.send(message);
                return;
              }
              // check member role
              if (targetUserRolePosition >= botRolePosition) {
                // define embed log
                const embedLog = new EmbedBuilder()
                  .setColor(Colors.COLOR_DANGER)
                  .setTitle(`${member.user.globalName} can't be timeouted`)
                  .setThumbnail(`${member.displayAvatarURL()}`)
                  .addFields(
                    {
                      name: "Reason",
                      value:
                        "I can't timeout that user because they have the same/higher role than me.",
                    },
                    { name: "Message content", value: archived_message },
                    { name: "Posted at", value: `<#${message.channelId}>` }
                  );
                channel.send({ embeds: [embedLog] });
                return;
              }
              // delete message sent by member
              message.delete();
              // send embed to log channel
              channel.send({ embeds: [embedLog] });
              member.send({ embeds: [embedDM] });
              // timeout member who posted non-whitelisted links
              member.timeout(24 * 60 * 60 * 1000);
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    }
  } catch (error) {
    console.log({ error });
  }
}
