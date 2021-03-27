const discord = require("discord.js");

module.exports = {
  info: {
      name: "ban",
      description: "Bane determinado usuario do servidor",
      usage: "",
      aliases: [""],
  },
  run : async (bot, message, args) => {    
    const user = message.mentions.users.first();

    // Se tivermos um usuário mencionado
    if (user) {

      // Agora obtemos o membro do usuário
      const member = message.guild.member(user);
      // Se o membro estiver na guilda
      if (member) {
        member
          .ban({
            reason: 'Eles eram ruins!',
          })
          .then((member) => {
              let embed_one = new discord.MessageEmbed()
              .setAuthor('🔨 | Banido')
              .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
              .setColor(1752220)
              .setDescription(`Banido com sucesso!`)    
              .setFooter(" Atenciosamente Kirigaya 者","https://media.discordapp.net/attachments/341697520931569666/736040264547958884/screen2.jpg")

              message.channel.send(embed_one)
          //   message.reply(`Banido com sucesso! ${user.tag}`);
          })
          .catch(err => {
              message.channel.send({embed: {
                  color: 15158332,
                  fields: [{
                      name: "Banimento",
                      value: "\n** **\n" + "🔴 | Não consegui banir o membro."
                    }]
                }})
          //   message.reply('Não consegui banir o membro');
            console.error(err);
          });
      } else {
          message.channel.send({embed: {
              color: 15105570,
              fields: [{
                  name: "Banimento",
                  value: "\n** **\n" + "🟠 | Esse usuário não está neste servidor."
                }]
            }})
      //   message.reply("Esse usuário não está neste servidor!");
      }
    } else {
        message.channel.send({embed: {
            color: 1752220,
            fields: [{
                name: "Banimento",
                value: "\n** **\n" + "🔴 | Você não mencionou o usuário para banir!"
              }]
          }})
                
      // message.reply("Você não mencionou o usuário para banir!");
    }
  }
}
