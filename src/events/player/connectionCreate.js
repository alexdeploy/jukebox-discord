const Event = require("../../models/Event.js");

module.exports = new Event("connectionCreate", async (player, queue, track) => {

    /**
     * This is a temporal solution.
     * !The bot stops playing music after 30 - 60 seconds.
     * The bug was found on @discordjs/voice and affect some voice servers.
     * Here is the resolution -> https://github.com/discordjs/discord.js/issues/9185#issuecomment-1452510633
     * * discord-player v6.0.0 comes with this patch. v6.0.0 users can disable default patch by setting DP_NO_KEEPALIVE_PATCH=true
     * * It's explained here -> https://github.com/Androz2091/discord-player/issues/1630#issuecomment-1454717872
     * Final code solution -> https://github.com/Androz2091/discord-player/issues/1630#issuecomment-1452877967
     */
    queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
        const oldNetworking = Reflect.get(oldState, 'networking');
        const newNetworking = Reflect.get(newState, 'networking');
  
        const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
          const newUdp = Reflect.get(newNetworkState, 'udp');
          clearInterval(newUdp?.keepAliveInterval);
        }
  
        oldNetworking?.off('stateChange', networkStateChangeHandler);
        newNetworking?.on('stateChange', networkStateChangeHandler);
      });
});