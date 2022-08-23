
# Jukebox | Discord music bot

Jukebox is an advanced music bot for Discord, written in JavaScript and using the lastest features of [discord.js](https://discord.js.org) and [discord-player](https://discord-player.js.org).

If you want to develop your own discord bot with Jukebox code, follow the [installation for devs](#installation-for-devs) below.

If you just want to try it, click on [invite to server](https://discord.com/api/oauth2/authorize?client_id=1011658447378448485&permissions=8&scope=bot). (Actually with admin permissions)

## Features

✅ Easy installation

✅ Slash Commands only

✅ Supports tracks and playlists from YouTube, Spotify and SoundCloud

## Usage Rules

⭐ Jukebox only is available in **one voice channel** at the same time.

⭐ Jukebox only responds if it's not connected to any voice channel, or you're connected to the same one.

⭐...

## Installation for devs

If you haven't created your bot before, see [how to create your bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) and [how to invite bot to server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links).

If you has already registered your bot in [Discord Developer Portal](https://discord.com/developers/docs), you can start the following steps. 

1. Clone the repository.

````
git clone https://github.com/alexruedadev/jukebox-discord.git
````

2. Change directory.
````
cd jukebox-discord
````

3. Install the dependencies.
````
npm install
````

3. Replace your [bot token]() and [client id]() in `config.json` file. (remove `example.`)
````
"token": "BOT_TOKEN_HERE",
"clientId": "BOT_ID"
````


3. Run your bot !!
````
npm start
````
or Development mode (with autoreload)
````
npm run dev
````

## Configuration

Actually the configuration is simple, but it will has advanced config personalization in **version 2.0**

config.json
````json
{
    soon...
}
````
## Contributions

All contributions are welcome. You can have a look to the [issues](https://github.com/alexruedadev/jukebox-discord/issues).

## Gratitudes

This project has been developed in my developer student time. I learned so much about JavaScript and search APIs docs like discord.js and discord-player. I'm gratefull with some developers and projects that have been a inspiration.

Thanks to [ZerioDev](https://github.com/ZerioDev) and [nizewn](https://github.com/nizewn) !