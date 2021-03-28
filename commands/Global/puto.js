const Discord = require("discord.js");
const client = new Discord.Client();
const canvacord = require("canvacord");

module.exports = {
    info: {
        name: "puto",
        description: "Cria uma imagem sua bravo",
        usage: "",
        aliases: ["bravo", "triggered"],
    },
    run : async (client, message, args, ops) => {

        message.delete();
    
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
      
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
        let image = await canvacord.trigger(avatar);
        let attachment = new Discord.MessageAttachment(image, "triggered.gif");
    
        return message.channel.send(attachment);
    }
}