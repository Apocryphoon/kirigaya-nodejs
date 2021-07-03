require("dotenv").config();//Loading .env
const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

client.config = {
  prefix: process.env.PREFIX,
  SOUNDCLOUD: process.env.SOUNDCLOUD_CLIENT_ID
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
// fs.readdir("./commands/", (err, files) => {
//     if (err) return console.error(err);
//     files.forEach((file) => {
//       if (!file.endsWith(".js")) return;
//       let props = require(`./commands/${file}`);
//       let commandName = file.split(".")[0];
//       client.commands.set(commandName, props);
//       console.log("Loading Command: "+commandName)
//     });
// });

//Loading Commands 2
const load = dirs => 
{
    const commands = fs.readdir(`./commands/${dirs}/`, (err, files) => 
    {
      try {
        files.forEach((file) => 
        {
          if (!file.endsWith(".js")) return;
          let props = require(`./commands/${dirs}/${file}`);
          let commandName = file.split(".")[0];

          client.commands.set(commandName, props);
          console.log("[+] Comando carregado com sucesso: "+commandName);
        });
      } catch (error) {
        console.log("[-] Comando carregado sem sucesso: "+commandName)
        webhook(`[-] Comando carregado sem sucesso`);
      }
    });
}
["Global", "Miscellaneous", "Music", "Tools"].forEach(x => load(x));

//Logging in to discord
client.login(process.env.TOKEN)
