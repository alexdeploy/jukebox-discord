const mongoose = require('mongoose');
const Guild = require('../server/models/Guild.model');

const DB = process.env.DB;
const DB_NAME = process.env.dbName;
const OPTIONS = {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

module.exports = {
	name: 'guildCreate',
    once: false,
    
	async execute(bot, interaction) {

        /**
         * * Interaction object is a Guild object
         * * I assign it to a variable called guild for easier understanding.
         * ? Why `execute` funcion recibe guild object instead of interaction object?
         * ! Be carefull with this, because this is a Guild object, not an Interaction object.
         * ! Maybe guild object is just an instance of Interaction object.
         */
        const guild = interaction;

		/**
		 * * Connect to MongoDB
         * * If connection is successful, 
         * @param {string} DB - MongoDB connection string. With username, password, and database name.
         * @param {object} OPTIONS - MongoDB connection options.
		 */
        await mongoose.connect(DB, OPTIONS)
            .then(() => console.log('✅ - ' + guild.name + ' has connected to ' + DB_NAME))
            .catch(err => console.error(err));

        /**
         * * Register guild in database.
		 * * Check if guild is in DB, if not, create new Guild and save to DB.
         * @param {string} guild.id - Discord guild ID.
		 */
        await Guild.find({id: guild.id})
            .then( async (result) => {
 
                // Check if result is empty
                if(result.length === 0) {

                    /**
                     * * Create new guild with Guild model
                     * TODO: Create Guild final model and save the most important data.
                     */
                    const newGuild = new Guild({
                        id: guild.id,
                        name: guild.name,
                        playlists: {}
                    });

                    /**
                     * * Save new guild to DB.
                     * * `.save()` is a mongoose method from Model class.
                     * @return {object} - Guild saved object. 
                     */
                    await newGuild.save()
                        .then(guild => console.log('✅ - ' + guild.name + ' has been saved on Database'))
                        .catch(err => console.error(err));

                } else {
                    console.log('✅ - ' + guild.name + ' already exists in Database');
                }
            })
            .then(() => {
                // Close connection
                mongoose.connection.close() ?
                console.log('✅ - ' + guild.name + ' has disconnected from ' + DB_NAME) : 
                console.log('❌ - ' + guild.name + ' failed to disconnect from ' + DB_NAME);
            })
            .catch(err => {
                console.error(err);
            });
    }
}