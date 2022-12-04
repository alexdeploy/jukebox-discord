const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Player } = require("discord-player");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const { Routes } = require('discord.js');
const extractor = require("../plugins/extractor");

const options = {
	intents: [
		GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageReactions,
		
	]
}

class Bot extends Client {

	constructor() {
		super(options);

		this.player = new Player(this);
        this.commands = new Collection();
		this.player.use("jukebox", extractor);

	}

    async start(token){

        // Check if token exists
        if (!token) console.error("Token not found!");

        // Load slash commands
        const commands = []
	    const commandDirs = fs.readdirSync('./src/commands/');

        commandDirs.map(dir => {
            const commandFiles = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../commands/${dir}/${file}`);

                this.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            }
        })

        const rest = new REST({ version: '10' }).setToken(token);

        rest.put(Routes.applicationCommands(process.env.clientId), { body: commands })
            .then(() => console.log('Successfully registered application commands.'))
            .catch(console.error);

        // Load bot events
        this.removeAllListeners();
        
        const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"))

		eventFiles.forEach(file => {
            const event = require(`../events/${file}`);

            this.on(event.name, event.execute.bind(null, this))
		});
        
        // Load discord player events
		fs.readdirSync("./src/events/player").filter(file => file.endsWith(".js"))
        .forEach(file => {
            const event = require(`../events/player/${file}`);

            this.player.on(event.event, event.execute.bind(null, this.player))
        });

        // Login to discord server
        this.login(token);
    }
}

module.exports = Bot;