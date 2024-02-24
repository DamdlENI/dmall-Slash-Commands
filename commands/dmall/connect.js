const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const {  guildId } = require('../../config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('connect')
        .setDescription('Affiche les informations sur les serveurs où le bot est actuellement.'),

    async execute(interaction = new CommandInteraction()) {


		if (interaction.guildId !== '1074199464773959783') {
            return await interaction.reply({ content: 'Only in Fantom server', ephemeral: true });
        }
	
        if (interaction.channelId !== '1205577525565067264') {
            return await interaction.reply({ content: 'Cette commande peut seulement être exécutée dans le canal spécifié.', ephemeral: true });
        }
	
        const modal = new ModalBuilder()
			.setCustomId('modalconnect')
			.setTitle('Fantom Connect');

	
	
			
		const tokenInput = new TextInputBuilder()
			.setCustomId('tokenInput')
		    
			.setLabel("Your Bot Tok3n")
		 
			.setStyle(TextInputStyle.Short);

		const useridInput = new TextInputBuilder()
			.setCustomId('useridInput')
			.setLabel("Your user ID")
		   
			.setStyle(TextInputStyle.Short);

			const clientidInput = new TextInputBuilder()
			.setCustomId('clientidInput')
			.setLabel("Your bot client ID")
		 
			.setStyle(TextInputStyle.Short);


		const firstActionRow = new ActionRowBuilder().addComponents(tokenInput);
		const secondActionRow = new ActionRowBuilder().addComponents(useridInput);
		const thirddActionRow = new ActionRowBuilder().addComponents(clientidInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow, thirddActionRow);

        await interaction.showModal(modal);
       
    }};
