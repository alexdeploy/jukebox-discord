const SlashCommand = require('../../models/SlashCommand');

module.exports = {

data: new SlashCommand()
		.setName('volume')
		.setDescription('Turn up or down the volume for everyone.')
        .addNumberOption(option =>
			option.setName('volume')
				.setDescription('Set the percentage of volume you want.')
				.setRequired(true)),

	async execute(interaction, bot) {

        try {

            const queue = bot.player.getQueue(interaction.guildId);
            const maxVol = 100;
            const minVol = 1;

            // if not queue
            if (!queue) return interaction.reply({ content: `No music currently playing`, ephemeral: true });

            // get volume
            const vol = interaction.options.getNumber('volume')

            // if volume is the same
            if (queue.volume === vol) return interaction.reply({ embeds: [{
                description: `The volume you want to change **is already the current one.**`,
                color: 0xb84e44
            }], failIfNotExists: false });
            
            // if volume is higher than 100
            if (vol > maxVol) return interaction.reply({ embeds: [{
                description: `The volume you want to change **is higher than 100%**.`,
                color: 0xb84e44
            }], failIfNotExists: false });

            // if volume is lower than 0
            if (vol < minVol) return interaction.reply({ embeds: [{
                description: `The volume you want to change **is lower than 1%**`,
                color: 0xb84e44
            }], failIfNotExists: false });

            // set volume
            const success = queue.setVolume(vol);

            // reply
            return interaction.reply(
                { embeds: success ? [{
                    description: `The volume has been modified to **${vol}**/**${maxVol}**% 🔊`,
                    color: 0x44b868
                }]
                :
                [{
                    description: `Something went wrong!`,
                    color: 0xb84e44
                }], failIfNotExists: false });

        } catch (error) {
            interaction.reply({ embeds: [{ description: `Error: ${error.message}`, color: 0xb84e44 }] });
        }
    }
}