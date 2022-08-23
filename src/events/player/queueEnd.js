const Event = require("../../models/Event.js");

module.exports = new Event("queueEnd", async (player, queue, track) => {
    console.log('Queue end event.') // Works??
});