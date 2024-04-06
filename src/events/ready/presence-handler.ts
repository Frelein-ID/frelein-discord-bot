import { Client, ActivityType } from "discord.js";
import type { CommandKit } from "commandkit";

export default function (client: Client<true>, handler: CommandKit) {
  // define status array
  let status = [
    {
      name: "with Katoshi",
      type: ActivityType.Playing,
    },
    {
      name: "with Katoshi",
      type: ActivityType.Listening,
      url: "https://open.spotify.com/intl-id/track/5bg3ec8eMOt9SgXNZLd5sF?si=0b77c7c4f44f4c74",
    },
    {
      name: "with Katoshi",
      type: ActivityType.Watching,
      url: "https://www.youtube.com/watch?v=vYKRIwJGRKk",
    },
    {
      name: "with Katoshi",
      type: ActivityType.Streaming,
    },
  ];
  // set activity to first status
  client.user.setActivity({
    name: "with Katoshi",
    type: ActivityType.Watching,
    url: "https://www.youtube.com/watch?v=-Uz4KJb2ies&pp=ygUKaGluYXRhemFrYQ%3D%3D",
  });
}
