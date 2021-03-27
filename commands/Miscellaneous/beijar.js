const Discord = require('discord.js');

module.exports = {
  info: {
      name: "beijar",
      description: "Da um beijo em determinado membro do servidor",
      usage: "",
      aliases: ["beijo", "beijinho", "selinho"],
  },
  run : async (client, message, args) => {

    var list = [
      'https://i.imgur.com/VOtWBMU.gif', //Nova 1
      'https://imgur.com/iclUiUN.gif', //Antiga 1
      'https://i.imgur.com/9NEFK3h.gif', //Nova 2
      'https://imgur.com/lYQt9rx.gif', //Antiga 2
      'https://i.imgur.com/wG0AxEj.gif', //Nova 3
      'https://imgur.com/w1TU5mR.gif', //Antiga 3
      'https://i.imgur.com/m47LHwx.gif', //Nova 4
      'https://i.imgur.com/cYyqghG.gif', //Nova 5
      'https://i.imgur.com/JWXXXue.gif', //Nova 6
    ];

    var rand = list[Math.floor(Math.random() * list.length)];
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);

    if (!user) {
      return message.reply('lembre-se de mencionar um usuário válido para beijar!');
    }

    let avatar = message.author.displayAvatarURL({format: 'png'});

    const embed = new Discord.MessageEmbed()
      .setTitle('Tem alguém apaixonado!')
      .setColor('#00ffee')
      .setDescription(`${message.author} acaba de beijar ${user}`)
      .setImage(rand)
      .setTimestamp()
      .setThumbnail(avatar)
      .setFooter('kirigaya 者',"https://i.imgur.com/LwLJ33j.png")
      .setAuthor(message.author.tag, avatar);
    await message.channel.send(embed);
  }
}