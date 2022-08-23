const SlashCommand = require('../../models/SlashCommand');

module.exports = {

data: new SlashCommand()
		.setName('disconnect')
		.setDescription('Disconnect bot from the voice channel.'),

	async execute(interaction, bot) {

        const queue = bot.player.getQueue(interaction.guildId);

        let errorReply = { embeds: [{
            description: `Something went wrong!`,
            color: 0xb84e44
        }], failIfNotExists: false };


        if (queue) await queue.destroy(true)
        
		const disconnected = interaction.guild.members.me.voice.disconnect();

        let successReply = { embeds: [{
            description: `👋 Disconnected`,
            color: 0x44b868
        }], failIfNotExists: false };

        disconnected ? interaction.reply(successReply) : interaction.reply(errorReply);
    }
}