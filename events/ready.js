module.exports = async client => {   
  //client.on("ready", () => {
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
      }, 5000)
    //}
  //);
    console.log(`O bot ${client.user.tag} teve sucesso ao iniciar!`); // Envia uma mensagem no terminal assim que o bot estiver conectado
    console.log(`${client.user.tag} iniciado com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais e em ${client.guilds.cache.size} servidores`)
};
