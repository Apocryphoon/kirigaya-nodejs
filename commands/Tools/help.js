const Discord = require("discord.js");
const moment = require('moment')

module.exports = {
  info: {
    name: "help",
    description: "Mostra todos os comandos do kirigaya",
    usage: "",
    aliases: ["ajuda"],
  },

run: async (client, message, args) => 
{
  const inline = true

          /**
     * Formata a data passada para o padrão do Brasil.
     * @param {string} template
     * @param {Date=} [date]
     * @return {string}
     */
    function formatDate (template, date) {
      var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
      date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
      return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
      return template.split(specs[i]).join(item)
      }, template)  
  }

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  const target = message.mentions.users.first() || message.author

        // .setDescription('\n** **\n' +
      //                '\n👈| Inicio\n' +
      //                '\n| Comando chat\n' +
      //                '\n<:2_:746046725386534962>| Comando música\n' +
      //                '\n<:3_:746046737084448990>| Comando moderação\n')

  if(!args[0]) 
    {
      message.delete()

        var embed = new Discord.MessageEmbed()

        .setColor('#00ffee')
        .setAuthor("Kirigaya 者","https://i.imgur.com/LwLJ33j.png")
        .setTitle(`**Comandos**`)
        .setThumbnail('https://i.imgur.com/U7Ccrdf.png')
        .setDescription(`Atualmente tenho ` + `\`20\`` + ' comandos\n' +
                        `\n**Categorias**\n` +                        
                        `<:1_:746046713877233816> **Música**\n` +
                        `<:2_:746046725386534962> **Diversão**\n` +
                        `<:3_:746046737084448990> **Interação**\n` +
                        `<:4_:746046746873954334> **Utilidade**\n` +
                        `<:5_:746046756621385839> **Moderação**\n` +
                        `<:6_:746046766654423161> **Informação**\n`)
        .setFooter('Reaja ao emote referente à categoria.')//.setTimestamp()  

        // .addField(`<a:vida:746057207510073435> **Fui criada em**`, moment().format('lll', client.user.createdAt), inline, true)
        // .addField(`<:__:746052238035779655> **Prefixo:**`, `\`ki!\``, inline, true)
        // .addField(`<a:pergunta:746051525339774976> **Me utilize!**`, `Clique [aqui](https://discord.com/oauth2/authorize?client_id=705935807936069634&scope=bot&permissions=8) para me adicionar`)
        // .addField(`<:arrowbluerigth:746071610267533424>`, `Clique nos emojis de acordo com a pagina que deseja ver:`)
        // .addField(`** **`)
        //.addField(`<:1_:746046713877233816> Chat`)//1
        //.addField(`<:2_:746046725386534962> Música`)//2
  

        var msg = await message.channel.send(embed)

        var emoji1 = await msg.react(`746046713877233816`)//1
        var emoji2 = await msg.react(`746046725386534962`)//2
        var emoji3 = await msg.react(`746046737084448990`)//3
        var emoji4 = await msg.react(`746046746873954334`)//4
        var emoji5 = await msg.react(`746046756621385839`)//5
        var emoji6 = await msg.react(`746046766654423161`)//6
        var back = await msg.react(`746084292047929374`)
    
    
        var c = msg.createReactionCollector((r, u) => r.me && u.id == message.author.id)
        c.on("collect", async r => 
        {
            switch(r.emoji.id) 
            {
                case `746046713877233816` ://1

                var emojia = new Discord.MessageEmbed()

                .setColor('#00ffee')
                .setAuthor("Kirigaya 者","https://i.imgur.com/LwLJ33j.png")
                .setTitle(`<:1_:746046713877233816>** **|** Música**`)
                .setThumbnail('https://i.imgur.com/e35NThp.png')
                .setDescription(                       
                `\n<:arrowbluerigth:746071610267533424> **ki!play <nome/url> -** Toca determinada musica.\n` +
                `<:arrowbluerigth:746071610267533424> **ki!parar -** Para a música tocando no momento.\n`)
                .setFooter('Reaja ao emote referente à categoria | Kirigaya 者')

                await msg.edit(emojia)

                break
                
                case `746046725386534962` ://2

                var emojia = new Discord.MessageEmbed()

                .setColor('#00ffee')
                .setAuthor("Kirigaya 者","https://i.imgur.com/LwLJ33j.png")
                .setTitle(`<:2_:746046725386534962>** **|** Diversão**`)
                .setDescription(                       
                  `\n<:arrowbluerigth:746071610267533424> **ki!tapa <usúario> -** Da um tapa em um determinado usúario.\n` +
                  `<:arrowbluerigth:746071610267533424> **ki!beijar <usúario> -** Da um beijo em um determinado usúario.\n` +
                  `<:arrowbluerigth:746071610267533424> **ki!puto <usúario> -** Mostra determinado usúario bravo (triggered).\n` +
                  `<:arrowbluerigth:746071610267533424> **ki!love <usúario> <usúario> -** Mostra a porcentagem de amor entre 2 usúarios.\n`)
                .setFooter('Reaja ao emote referente à categoria | Kirigaya 者')

                await msg.edit(emojia)

                break
                
                case `746046737084448990` ://3

                var emojia = new Discord.MessageEmbed()

                .setColor('#00ffee')
                .setAuthor("Kirigaya 者","https://i.imgur.com/LwLJ33j.png")
                .setTitle(`<:3_:746046737084448990>** **|** Interação**`)
                .setDescription(                       
                  `\n<:arrowbluerigth:746071610267533424> **ki!steam <jogo> -** Retorna informações sobre o jogo na **steam**.\n` +
                  `<:arrowbluerigth:746071610267533424> **ki!emoji <nome-do-emoji> -** Retorna determinado emoji animado ou não.\n` +
                  `<:arrowbluerigth:746071610267533424> **ki!ascii <msg> -** Cria um **ascii* usando a <msg>.\n`)
                .setFooter('Reaja ao emote referente à categoria | Kirigaya 者')                

                await msg.edit(emojia)

                break

                // NOVOS
                case `746046746873954334` ://4

                var emojia = new Discord.MessageEmbed()

                .setColor('#00ffee')
                .setAuthor("Kirigaya 者","https://i.imgur.com/LwLJ33j.png")
                .setTitle(`<:4_:746046746873954334>** **|** Utilidade**`)
                .setThumbnail('https://i.imgur.com/8rszmT3.png')
                .setDescription(                      
                  `\n<:arrowbluerigth:746071610267533424> **ki!ping -** Retorna sua conexão com o discord.\n` +
                  `<:arrowbluerigth:746071610267533424> **ki!avatar -** Mostra o avatar de determinado usúario.\n` +
                  `<:arrowbluerigth:746071610267533424> **ki!limpar <2-100> -** Apaga mensagens na sala atual.\n`)
                .setFooter('Reaja ao emote referente à categoria | Kirigaya 者')                   

                await msg.edit(emojia)
  
                break
                
                case `746046756621385839` ://5

                var emojia = new Discord.MessageEmbed()

                .setColor('#00ffee')
                .setAuthor("Kirigaya 者","https://i.imgur.com/LwLJ33j.png")
                .setTitle(`<:5_:746046756621385839>** **|** Moderação**`)
                .setThumbnail('https://i.imgur.com/kp3WQFI.png')
                .setDescription(
                  `\n<:arrowbluerigth:746071610267533424> **ki!ban <usúario> -** Bane um determinado usúario do servidor.\n` +
                  `<:arrowbluerigth:746071610267533424> **ki!anuncio <sala><msg> -** Faz um anuncio.\n`)
                .setFooter('Reaja ao emote referente à categoria | Kirigaya 者')   

                await msg.edit(emojia)

                break

                case `746046766654423161` ://6

                var emojia = new Discord.MessageEmbed()

                .setColor('#00ffee')
                .setAuthor("Kirigaya 者","https://i.imgur.com/LwLJ33j.png")
                .setTitle(`<:5_:746046756621385839>** **|** Informação**`)
                .setThumbnail('https://i.imgur.com/pheTqH6.png')
                .setDescription(
                  `\n<:arrowbluerigth:746071610267533424> **ki!userinfo <usúario> -** Retorna informações do usúario.\n` +
                  `<:arrowbluerigth:746071610267533424> **ki!infoserver -** Retorna informações do servidor.\n` +
                  `<:arrowbluerigth:746071610267533424> **ki!discord -** Retorna informações sobre o discord\n`)
                .setFooter('Reaja ao emote referente à categoria | Kirigaya 者')   

                await msg.edit(emojia)

                break

                case `746084292047929374` ://7

                var emojia = new Discord.MessageEmbed()

                .setColor('#00ffee')
                .setAuthor("Kirigaya 者","https://i.imgur.com/LwLJ33j.png")
                .setTitle(`**Comandos**`)
                .setThumbnail('https://i.imgur.com/U7Ccrdf.png')
                .setDescription(`Atualmente tenho ` + `\`20\`` + ' comandos\n' +
                                `\n**Categorias**\n` +                        
                                `<:1_:746046713877233816> **Música**\n` +
                                `<:2_:746046725386534962> **Diversão**\n` +
                                `<:3_:746046737084448990> **Interação**\n` +
                                `<:4_:746046746873954334> **Utilidade**\n` +
                                `<:5_:746046756621385839> **Moderação**\n` +
                                `<:6_:746046766654423161> **Informação**\n`)
                .setFooter('Reaja ao emote referente à categoria.')

                await msg.edit(emojia)

                break
                
            }
        });
    }   
}
}