/**
 * O Comando "serverinfo" mostrará informações do servidor
 */

const discord = require('discord.js')

const moment = require('moment')
moment.locale('pt-br')

module.exports = {
  info: {
      name: "infoserver",
      description: "Mostra algumas informações sobre este servidor discord",
      usage: "",
      aliases: ["server","servidor", "serverinfo", "sinfo"],
  },
run : (client, message, args, ops) => {

    const date = message.guild.createdAt
    const joined = message.member.joinedAt

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

    const region = {
      brazil: ':flag_br: Brazil'
    }

    const embed = new discord.MessageEmbed()
      .setColor(client.displayHexColor === '#000000' ? '#ffffff' : client.displayHexColor)
      // .setThumbnail(message.guild.iconURL)
      .setAuthor('🔍 Informações do servidor')
      .addField('**Nome**', message.guild.name, true)
      .addField('**ID**', message.guild.id, true)
      .addField('**Dono(a)**', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
      .addField('**Região**', region[message.guild.region], true)
      .addField('**Humanos | Bots**', `${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`)
      .addField('**Canais**', message.guild.channels.cache.size, true)
      .addField('**Cargos**', message.guild.roles.cache.size, true)
      .addField('**Criado em**', formatDate('DD/MM/YYYY, às HH:mm:ss', date))
      .addField('**Você entrou em**', formatDate('DD/MM/YYYY, às HH:mm:ss', joined))
      .setFooter('2020 © Kirigaya.')
      .setTimestamp()

    // Aqui sera enviado o embed no canal que o usuário executo o comando
    message.channel.send(embed)
  },
}