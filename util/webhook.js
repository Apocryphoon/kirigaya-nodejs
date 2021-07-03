const Discord = require('discord.js');

//funcionando
module.exports = async (text) => {
    const webhook = new Discord.WebhookClient('860200172012175400', '_J04f2M61Aee2SwF43w_s2Y0vtsx5NEu64YrZ6P4W48O39JMPPb8XKKbjsC7Gsv7oCdt');
    webhook.send(text);
}