const Interaction = require('../../../models/interaction');

exports.createInteraction = async (req, res) => {
  try {
    const newInteraction = await Interaction.create(req.body, {
      fields: ['reportId', 'severity', 'comment', 'description', 'source']
  });
    res.status(201).json(newInteraction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getInteractions = async (req, res) => {
  try {
    const interactions = await Interaction.findAll();
    res.json(interactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getInteractionById = async (req, res) => {
  try {
    const interaction = await Interaction.findByPk(req.params.id);
    if (!interaction) {
      return res.status(404).json({ message: 'Interaction not found' });
    }
    res.json(interaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.updateInteraction = async (req, res) => {
  try {
    const interaction = await Interaction.findByPk(req.params.id);
    if (!interaction) {
      return res.status(404).json({ message: 'Interaction not found' });
    }
    await interaction.update(req.body);
    res.json(interaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteInteraction = async (req, res) => {
  try {
    const interaction = await Interaction.findByPk(req.params.id);
    if (!interaction) {
      return res.status(404).json({ message: 'Interaction not found' });
    }
    await interaction.destroy();
    res.json({ message: 'Interaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
