const SlashCommand = require('../../models/SlashCommand');

module.exports = {

data: new SlashCommand()
		.setName('pause')
		.setDescription('Pause the current song.'),

	async execute(interaction, bot) {

        // get queue
        const queue = bot.player.getQueue(interaction.guildId);

        let errorReply = { embeds: [{
            description: `There is **not music playing**`,
            color: 0xb84e44
        }], failIfNotExists: false };

        // actions
        if (!queue) interaction.reply(errorReply);

        let successReply = { embeds: [{
            description: `Paused **[${queue.tracks[0].title}](${queue.tracks[0].url})**`,
            color: 0x44b868
        }], failIfNotExists: false };

        const paused = queue.setPaused(true);

        paused ? interaction.reply(successReply) : interaction.reply(errorReply);
    }
}