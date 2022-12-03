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

        let notPreviousReply = { embeds: [{
            description: `There is not previous songs in queue.**`,
            color: 0xb84e44
        }], failIfNotExists: false };

        let successReply = { embeds: [{
            description: `Back to previous song`,
            color: 0x44b868
        }], failIfNotExists: false };

        if (!queue) return interaction.reply(errorReply);

        const previous = queue.previousTracks.length > 1; // the previous track size is 1 when the current track is the first track.

        console.log(queue.previousTracks.length)

        if(previous){
            queue.back();
            interaction.reply(successReply);
        } else {
            interaction.reply(notPreviousReply);
        }
    }
}