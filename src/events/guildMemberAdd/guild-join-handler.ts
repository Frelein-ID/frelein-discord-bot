import "dotenv/config";
import { GuildMember } from "discord.js";
import { Channels } from "../../constants/channels";
import { TextChannel } from "discord.js";

export default function (member: GuildMember) {
  try {
    // Create a welcome message
    let message = `
          Halo <@${member.id}, Selamat datang di Server Discord ${member.guild.name}! \n\nSebelumnya jangan lupa baca dulu <#${Channels.CHANNEL_RULES}> server ini ya.\n\nLalu jika berkenan, silahkan perkenalkan dirimu di channel <#${Channels.CHANNEL_JIKO}> karena ada pepatah bilang "Tak kenal maka tak sayang".\n\nUntuk bisa bergabung dalam chat, pastikan kamu menyetujui rules yang ada agar mendapatkan role sebagai Member.\n\nSelebihnya silahkan Have Fun! 😆 👍`;

    const channel: TextChannel = member.guild.channels.cache.get(
      Channels.CHANNEL_WELCOME
    ) as TextChannel;
    channel.send(message);
  } catch (error) {
    // Log any errors that occur
    console.log(error);
  }
}
