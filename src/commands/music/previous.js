const SlashCommand = require('../../models/SlashCommand');

module.exports = {

data: new SlashCommand()
		.setName('previous')
		.setDescription('Skip to previous song.'),

	async execute(interaction, bot) {

        const queue = bot.player.getQueue(interaction.guildId);

        let errorReply = { embeds: [{
            description: `There is **not music playing**`,
            color: 0xb84e44
        }], failIfNotExists: false };

        if (!queue) return interaction.reply(errorReply);

        let successReply = { embeds: [{
            description: `Back to previous song`,
            color: 0x44b868
        }], failIfNotExists: false };

        const backed = queue.back();
        
        backed ? interaction.reply(successReply) : interaction.reply(errorReply);
    }
}