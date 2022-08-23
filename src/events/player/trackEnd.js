const Event = require("../../models/Event.js");

module.exports = new Event("trackEnd", async (player, queue, track) => {
    console.log('Track end event.')
});