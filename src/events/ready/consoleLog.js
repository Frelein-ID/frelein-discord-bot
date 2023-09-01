const { ActivityType } = require('discord.js');

module.exports = (client) => {
    // bot status
    let status = [
        {
            name: "with Katoshi",
            type: ActivityType.Playing
        },
        {
            name: "with Katoshi",
            type: ActivityType.Listening,
            url: "https://open.spotify.com/intl-id/track/5bg3ec8eMOt9SgXNZLd5sF?si=0b77c7c4f44f4c74"
        },
        {
            name: "with Katoshi",
            type: ActivityType.Watching,
            url: "https://www.youtube.com/watch?v=vYKRIwJGRKk"
        },
        {
            name: "with Katoshi",
            type: ActivityType.Streaming,
        }
    ]
    console.log(`${client.user.tag} is online`)

    // set bot status
    client.user.setActivity(status[0]);
}