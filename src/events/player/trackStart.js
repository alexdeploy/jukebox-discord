const Event = require("../../models/Event.js");

module.exports = new Event("trackStart", async (player, queue, track) => {
    console.log('Track start event.')
});