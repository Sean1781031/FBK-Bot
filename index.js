const express = require("express"); //引入 express library
const app = express(); // express 引入的是一個 function


app.listen(3000, () => {
  console.log("project is running!");
})

app.get("/", (req, res) => {
  res.send("konkon kitsune!");
})

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  allowedMentions: ["users"]
});
const fs = require("fs");
const prefix = "f!"
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./commands/${commandName}`)
  client.commands.set(commandName, command)
}

client.on("messageCreate", message => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    command.run(client, message, args)

  }
})

client.login(process.env.token)