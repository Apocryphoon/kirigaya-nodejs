const discord = require("discord.js");

module.exports = {
    info: {
        name: "loveold",
        description: "loveold",
        usage: "loveold",
        aliases: ["amorold"],
    },
    run : (client, message, args, ops) => {

        let person = message.mentions.members.first(message, args[0]);

        if(person.id === message.author.id) return message.channel.send("NÃ£o posso te falar!");

        const love = Math.round(Math.random() * 100);
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "ð".repeat(loveIndex) + "ð".repeat(10 - loveIndex);
        
        let loveEmbed = new discord.MessageEmbed() 
        .setTitle("Porcentual do amor")
        .setDescription(`${message.author} ama ${person} tanto: ${love}%\n\n${loveLevel}`)
        message.channel.send(loveEmbed)
        
    }
}
