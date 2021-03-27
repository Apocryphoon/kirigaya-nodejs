const discord = require("discord.js");

module.exports = {
    info: {
        name: "ping",
        aliases: ["latencia"],
        description: "Conexão com o bot!",
        usage: "",
    },

    run: async (bot, message, args) => {

    message.channel.send({embed: {
        color: 1752220,
        fields: [{
            name: "Pong!",
            value: "\n** **\n" + `<a:loading:746071599199027340> | Estamos verificando sua conexão, aguarde!`
        }
    ]}}).then(m => {
        setInterval(() => {
            m.edit({embed: {
                color: 1752220,
                fields: [{
                    name: "Pong!",
                    value: "\n** **\n" + "A Latência é: " + Math.round(bot.ws.ping) + ' ms'
                }
            ]
        }});}, 5000);})
    }
}