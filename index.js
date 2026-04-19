const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ID do cargo que vai mudar de cor
const ROLE_ID = "1495189865686499328";

function randomColor() {
  return Math.floor(Math.random() * 16777215);
}

client.once("ready", () => {
  console.log(`Bot online como ${client.user.tag}`);

  // LOOP A CADA 60 SEGUNDOS (ESTÁVEL)
  setInterval(async () => {
    try {
      client.guilds.cache.forEach(async (guild) => {
        const role = guild.roles.cache.get(ROLE_ID);
        if (!role) return;

        const color = randomColor();

        await role.setColor(color).catch((err) => {
          console.log("Erro ao mudar cor:", err.message);
        });
      });
    } catch (err) {
      console.log("Erro geral no loop:", err);
    }
  }, 60000);
});

client.login(process.env.DISCORD_TOKEN);
