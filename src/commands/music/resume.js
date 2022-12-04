const SlashCommand = require('../../models/SlashCommand');

module.exports = {

data: new SlashCommand()
		.setName('resume')
		.setDescription('Resume paused song.'),

	async execute(interaction, bot) {

        try{

            const queue = bot.player.getQueue(interaction.guildId);

            let errorReply = { embeds: [{
                description: `There is **not music playing**`,
                color: 0xb84e44
            }], failIfNotExists: false };

            if (!queue) return interaction.reply(errorReply);

            const resumed = queue.setPaused(false);

            let successReply = { embeds: [{
                description: `Resumed the current song`,
                color: 0x44b868
            }], failIfNotExists: false };
            
            /* let successReply = { embeds: [{
                description: `Playing **[${queue.tracks[0].title}](${queue.tracks[0].url})**`,
                color: 0x44b868
            }], failIfNotExists: false };
            */
            resumed ? interaction.reply(successReply) : interaction.reply('Music is already playing');

        } catch (error) {
                interaction.reply({ embeds: [{ description: `Error: ${error.message}`, color: 0xb84e44 }] });
        }
    }
}