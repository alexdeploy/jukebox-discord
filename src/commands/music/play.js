const SlashCommand = require('../../models/SlashCommand');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

data: new SlashCommand()
		.setName('play')
		.setDescription('Plays a song or a playlist.')
		.addStringOption(option =>
			option.setName('track')
				.setDescription('Track name or link from Spotify or YouTube')
				.setRequired(true)),


	async execute(interaction, bot) {

        const song = interaction.options.getString('track');
		const guildId = interaction.guildId;
		let reply;
		
		await interaction.deferReply();

        const search = await bot.player.search(song, { requestedBy: interaction.user, searchEngine: "jukebox" })

		const queue = await bot.player.createQueue(
			guildId,
			{ metadata: { channel: interaction.channelId },
			bufferingTimeout: 500,
            disableVolume: false,
            leaveOnEnd: true,
			leaveOnStop: true,
            spotifyBridge: false,
			leaveOnEmptyCooldown: 200000,
		});

		try {
			if (!queue.connection) await queue.connect(interaction.member.voice.channel);
		}
		catch {
			await bot.player.deleteQueue(guildId);

			reply = { embeds: [{ description: 'You are not in a voice channel.', color: 0x44b868 }] };
			
			interaction.editReply(reply);
			await wait(3000);
			return interaction.deleteReply();
        }

		/* search.playlist ? queue.addTracks(search.tracks) : queue.addTrack(search.tracks[0]); */

		if(search.playlist) {
            reply = { embeds: [{
                description: `Queued **${search.tracks.length}** tracks from [${search.tracks[0].playlist.title}](${search.tracks[0].playlist.url})`,
                color: 0x44b868
            }], failIfNotExists: false };
            queue.addTracks(search.tracks);
        } else {
            reply = { embeds: [{
                description: `Queued **[${search.tracks[0].title}](${search.tracks[0].url})**`,
                color: 0x44b868
            }], failIfNotExists: false };
            queue.addTrack(search.tracks[0]);
        }
		console.log(queue)
		interaction.editReply(reply);

		if (!queue.playing) await queue.play();
    }
}