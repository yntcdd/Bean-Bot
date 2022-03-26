const Discord = require("discord.js");
require("dotenv").config();

const generateImage = require("./generateImage");

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

let bot = {
  client,
  prefix: "b.",
  owners: ["767862326862020689"],
};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) =>
  require("./handlers/commands")(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot;

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}`);
// });

// client.on("messageCreate", (message) => {
//   if (message.content === "hi") {
//     message.reply("Hello World!");
//   }
// });

const welcomeChannelId = "956635923490144406";

client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache.get(welcomeChannelId).send({
    content: `<@${member.id}> Welcome to the server!`,
    files: [img],
  });
});

client.login(process.env.TOKEN);
