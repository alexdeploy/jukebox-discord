module.exports = {
	name: 'interactionCreate',
    once: false,
    
	async execute(bot, interaction) {
		
		if(interaction.isCommand()){
			const command = interaction.client.commands.get(interaction.commandName);

			if(!command) return;
	
			try {
				await command.execute(interaction, bot);
			}
			catch (err) {
				console.error(err);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}

    }
}