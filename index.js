const { Client, GatewayIntentBits } = require("discord.js");

// cria o bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// ID DO CARGO QUE VAI MUDAR DE COR
const ROLE_ID = "1495189865686499328";

// função de cor aleatória
function randomColor() {
  return Math.floor(Math.random() * 16777215);
}

// quando o bot ligar
client.once("ready", () => {
  console.log(`Bot online como ${client.user.tag}`);

  // LOOP A CADA 10 SEGUNDOS
  setInterval(async () => {
    try {
      client.guilds.cache.forEach(async (guild) => {
        const role = guild.roles.cache.get(ROLE_ID);
        if (!role) return;

        const color = randomColor();

        await role.setColor(color).catch(() => {});
      });
    } catch (err) {
      console.log("Erro no loop:", err);
    }
  }, 10000); // 10 segundos
});

// login do bot
client.login(process.env.DISCORD_TOKEN);
