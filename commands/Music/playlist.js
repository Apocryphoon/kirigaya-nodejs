const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("ytdl-core-discord");
var ytpl = require("ytpl");
const sendError = require("../../util/error");
const fs = require("fs");
const scdl = require("soundcloud-downloader").default;
module.exports = {
    info: {
        name: "playlist",
        description: "Para tocar uma playlist de musicas",
        usage: "<YouTube Playlist URL | Playlist Name>",
        aliases: ["pl"],
    },

    run: async function (client, message, args) {
        const channel = message.member.voice.channel;
        if (!channel) return sendError("Sinto muito, mas você precisa estar em um canal de voz para tocar música!", message.channel);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var searchString = args.join(" ");
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError("Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!", message.channel);
        if (!permissions.has("SPEAK")) return sendError("Não posso falar neste canal de voz, certifique-se de que tenho as permissões adequadas!", message.channel);

        if (!searchString || !url) return sendError(`Usage: ${message.client.config.prefix}playlist <YouTube Playlist URL | Playlist Name>`, message.channel);
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            try {
                const playlist = await ytpl(url.split("list=")[1]);
                if (!playlist) return sendError("Playlist não encontrado", message.channel);
                const videos = await playlist.items;
                for (const video of videos) {
                    // eslint-disable-line no-await-in-loop
                    await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
                }
                return message.channel.send({
                    embed: {
                        color: "GREEN",
                        description: `✅  **|**  Playlist: **\`${videos[0].title}\`** foi adicionado à fila`,
                    },
                });
            } catch (error) {
                console.error(error);
                return sendError("Playlist não encontrado :(", message.channel).catch(console.error);
            }
        } else {
            try {
                var searched = await yts.search(searchString);

                if (searched.playlists.length === 0) return sendError("Parece que não consegui encontrar a lista de reprodução no YouTube", message.channel);
                var songInfo = searched.playlists[0];
                let listurl = songInfo.listId;
                const playlist = await ytpl(listurl);
                const videos = await playlist.items;
                for (const video of videos) {
                    // eslint-disable-line no-await-in-loop
                    await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
                }
                let thing = new MessageEmbed()
                    .setAuthor("Playlist foi adicionado à fila")
                    .setThumbnail(songInfo.thumbnail)
                    .setColor("GREEN")
                    .setDescription(`✅  **|**  Playlist: **\`${songInfo.title}\`** foi adicionado à fila \`${songInfo.videoCount}\` vídeo para a fila`);
                return message.channel.send(thing);
            } catch (error) {
                return sendError("Ocorreu um erro inesperado", message.channel).catch(console.error);
            }
        }

        async function handleVideo(video, message, channel, playlist = false) {
            const serverQueue = message.client.queue.get(message.guild.id);
            const song = {
                id: video.id,
                title: Util.escapeMarkdown(video.title),
                views: video.views ? video.views : "-",
                ago: video.ago ? video.ago : "-",
                duration: video.duration,
                url: `https://www.youtube.com/watch?v=${video.id}`,
                img: video.thumbnail,
                req: message.author,
            };
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: channel,
                    connection: null,
                    songs: [],
                    volume: 80,
                    playing: true,
                    loop: false,
                };
                message.client.queue.set(message.guild.id, queueConstruct);
                queueConstruct.songs.push(song);

                try {
                    var connection = await channel.join();
                    queueConstruct.connection = connection;
                    play(message.guild, queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`Não consegui entrar no canal de voz: ${error}`);
                    message.client.queue.delete(message.guild.id);
                    return sendError(`Não consegui entrar no canal de voz: ${error}`, message.channel);
                }
            } else {
                serverQueue.songs.push(song);
                if (playlist) return;
                let thing = new MessageEmbed()
                    //.setAuthor(`<a:checkout:745851470947024936> | Adicionada: ${song.title}`)
                    .addField(`<a:checkout:745851470947024936> |ㅤAdicionada:`, song.title, false)
                    .setThumbnail(song.img)
                    .setColor("#00fff7")
                    //.addField("Nome", song.title, true)
                    .addField(`Duração`, "[" + song.duration + "] Segㅤ", true)
                    .addField(`Lançado em`, song.ago , true)
                    .addField(`Solicitado por`, song.req.tag, true)
                    //.addField("Pedida por", song.req.tag, true)
                    //.setFooter(`Visualizações: ${song.views} | ${song.ago}`);
                return message.channel.send(thing);
            }
            return;
        }

        async function play(guild, song) {
            const serverQueue = message.client.queue.get(message.guild.id);
            if (!song) {
                sendError(
                    message.channel
                );
                message.client.queue.delete(message.guild.id);
                return;
            }
            let stream = null;
            let streamType;

            try {
                if (song.url.includes("soundcloud.com")) {
                    try {
                        stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, client.config.SOUNDCLOUD);
                    } catch (error) {
                        stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, client.config.SOUNDCLOUD);
                        streamType = "unknown";
                    }
                } else if (song.url.includes("youtube.com")) {
                    stream = await ytdl(song.url, { quality: "highestaudio", highWaterMark: 1 << 25, type: "opus" });
                    stream.on("error", function (er) {
                        if (er) {
                            if (serverQueue) {
                                serverQueue.songs.shift();
                                play(serverQueue.songs[0]);
                                return sendError(`An unexpected error has occurred.\nPossible type \`${er}\``, message.channel);
                            }
                        }
                    });
                }
            } catch (error) {
                if (serverQueue) {
                    console.log(error);
                    serverQueue.songs.shift();
                    play(serverQueue.songs[0]);
                }
            }
            serverQueue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
            const dispatcher = serverQueue.connection.play(stream).on("finish", () => {
                const shiffed = serverQueue.songs.shift();
                if (serverQueue.loop === true) {
                    serverQueue.songs.push(shiffed);
                }
                play(guild, serverQueue.songs[0]);
            });

            dispatcher.setVolume(serverQueue.volume / 100);
            let thing = new MessageEmbed()
                .setAuthor("Started Playing Music!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
                .setThumbnail(song.img)
                .setColor("BLUE")
                .addField("Name", song.title, true)
                .addField("Duration", song.duration, true)
                .addField("Requested by", song.req.tag, true)
                .setFooter(`Views: ${song.views} | ${song.ago}`);
            serverQueue.textChannel.send(thing);
        }
    },
};
