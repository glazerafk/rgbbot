require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const ROLE_ID = "1495189865686499328";

function randomColor() {
  return Math.floor(Math.random() * 16777215);
}

client.once("ready", () => {
  console.log("Bot online!");

  setInterval(async () => {
    client.guilds.cache.forEach(async (guild) => {
      const role = guild.roles.cache.get(ROLE_ID);
      if (!role) return;

      role.setColor(randomColor()).catch(() => {});
    });
  }, 60000);
});

client.login(process.env.DISCORD_TOKEN);
