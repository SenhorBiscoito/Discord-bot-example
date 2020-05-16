module.exports = {
    name: "ping",
    description: "Retorna a Latencia e a API do ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pingando....`);

        msg.edit(`🏓 Pong!
        Latencia de ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        API Latencia de ${Math.round(client.ping)}ms`);
    }
}
