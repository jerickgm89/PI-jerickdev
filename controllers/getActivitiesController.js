const { Activity } = require('../db.js');

const getActivitiesController = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getActivitiesController;