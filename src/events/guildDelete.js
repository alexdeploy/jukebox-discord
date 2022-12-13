module.exports = {
	name: 'guildDelete',
	once: true,
    
	async execute(bot, interaction) {
		
		console.log('Bot has been removed from server ' + interaction.name);

	},
};