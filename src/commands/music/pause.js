const SlashCommand = require('../../models/SlashCommand');

module.exports = {

data: new SlashCommand()
		.setName('pause')
		.setDescription('Pause the current song.'),

	async execute(interaction, bot) {

        try {
        
            // get queue
            const queue = bot.player.getQueue(interaction.guildId);

            let errorReply = { embeds: [{
                description: `There is **not music playing**`,
                color: 0xb84e44
            }], failIfNotExists: false };

            // actions
            if (!queue || !queue.connection) return interaction.reply(errorReply);

            let successReply = { embeds: [{
                description: `Paused the current song`,
                color: 0x44b868
            }], failIfNotExists: false };

            const paused = queue.setPaused(true);

            paused ? interaction.reply(successReply) : interaction.reply(errorReply);

        } catch (error) {
            interaction.reply({ embeds: [{ description: `Error: ${error.message}`, color: 0xb84e44 }] });
        }
    }
}