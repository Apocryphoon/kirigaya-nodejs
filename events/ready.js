const webhook = require('../util/webhook');

module.exports = async client => {   
  var data = new Date();
  //DATE
  var dia     = data.getDate();
  var mes     = data.getMonth();
  var ano4    = data.getFullYear();
  //HORAS
  var hora    = data.getHours();
  var min     = data.getMinutes();
  var seg     = data.getSeconds();

  var str_data = dia + '/' + (mes+1) + '/' + ano4;
  var str_hora = hora + ':' + min + ':' + seg;

    const status = [
        {name: `🕵️ Pornografia`, type: 'STREAMING', url: 'https://www.twitch.tv/nasa'},
        {name: `🎮 ki!ajuda`, type: 'PLAYING'},
        {name: `🔊 Meu prefixo é ki!`, type: 'LISTENING'},
        {name: `${client.guilds.cache.size} servidores!`, type: 'WATCHING'},
        {name: `${client.users.cache.size} usuários!`, type: 'WATCHING'}
      ]

      setInterval(() => {
        const selected = status[Math.floor(Math.random() * status.length)];
        client.user.setActivity(selected).catch(err => console.log(err))
      }, 5000);

    webhook(`[!] Carregando comandos, aguarde um momento enquanto verificamos...`);

    setTimeout(() => {
      webhook(`[+] Comandos carregados com sucesso!`);
    }, 5000);
    
    setTimeout(() => {
      webhook(`[+][${str_data+' - '+str_hora}] O bot ${client.user.tag} teve sucesso ao iniciar!`);
    }, 5000);
    console.log(`O bot ${client.user.tag} teve sucesso ao iniciar!`);
    
    setTimeout(() => {
      webhook(`[+][${str_data+' - '+str_hora}] ${client.user.tag} iniciado com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais e em ${client.guilds.cache.size} servidores`);
    }, 5000);
    console.log(`${client.user.tag} iniciado com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais e em ${client.guilds.cache.size} servidores`);
};
