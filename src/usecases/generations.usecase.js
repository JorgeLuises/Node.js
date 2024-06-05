const Generations = require('../models/generations.model');

async function createGeneretion (generationData) {
    const newGeneration = await Generations.create(generationData);
    return newGeneration;
};

async function getAllGenerations () {
    const allGenerations = await Generations.find();
    return allGenerations;
};

async function getGenerationById (id) {
    const generationById = await Generations.findById(id);
    return generationById;
};

async function deleteGenerationById (id) {
    const generationDeleted = await Generations.findByIdAndDelete(id);
    return generationDeleted;
};

async function updateGenerationById (id, newData) {
    const generationUpdated = await Generations.findByIdAndUpdate(id, newData, {new: true});
    return generationUpdated;
};

module.exports = {
    createGeneretion,
    getAllGenerations,
    getGenerationById,
    deleteGenerationById,
    updateGenerationById
};