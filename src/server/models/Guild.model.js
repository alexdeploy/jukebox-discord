const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    id: String,
    name: String,
    playlists: Object
});

const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;