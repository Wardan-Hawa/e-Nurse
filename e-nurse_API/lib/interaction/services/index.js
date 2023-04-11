const Interaction = require('../../../models/interaction');

const createInteraction = async (data) => {
    try {
        const newInteraction = await Interaction.create(data);
        return newInteraction;
    } catch (err) {
        throw new Error(err.message);
    }
}

const getInteractions = async () => {
    try {
        const interactions = await Interaction.findAll();
        return interactions;
    } catch (err) {
        throw new Error(err.message);
    }
}

const getInteractionById = async (id) => {
    try {
        const interaction = await Interaction.findByPk(id);
        if (interaction == null) {
            throw new Error('Cannot find interaction');
        }
        return interaction;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateInteraction = async (id, data) => {
    try {
        const interaction = await Interaction.findByPk(id);
        if (interaction == null) {
            throw new Error('Cannot find interaction');
        }
        await interaction.update(data);
        return interaction;
    } catch (err) {
        throw new Error(err.message);
    }
}

const deleteInteraction = async (id) => {
    try {
        const interaction = await Interaction.findByPk(id);
        if (interaction == null) {
            throw new Error('Cannot find interaction');
        }
        await interaction.destroy();
        return { message: 'Interaction deleted' };
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    createInteraction,
    getInteractions,
    getInteractionById,
    updateInteraction,
    deleteInteraction
}
