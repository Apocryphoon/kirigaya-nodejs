const Discord = require("discord.js"); 

module.exports = {
  info: {
      name: "infoserver",
      description: "Mostra algumas informações sobre este servidor discord",
      usage: "",
      aliases: ["server","servidor", "serverinfo", "sinfo"],
  },
  run : async (client, message, args) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    
    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

    let embed = new Discord.MessageEmbed() 
      .setColor(`#00ffee`) 
      .setTitle(`Avatar de ${user.username}`) 
      .setImage(avatar) 
      .setTimestamp()
      .setFooter(`• Autor: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
    await message.channel.send(embed); 

  }
}