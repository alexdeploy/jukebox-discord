const SlashCommand = require('../../models/SlashCommand');
const ms = require('ms');

module.exports = {

data: new SlashCommand()
		.setName('ping')
		.setDescription('Calculate the latency from server.'),

	async execute(interaction, bot) {
        interaction.channel.send(`Last heartbeat calculated ${ms(Date.now() - bot.ws.shards.first().lastPingTimestamp, { long: true })} ago **${bot.ws.ping}ms** 🛰️`);
    }

}