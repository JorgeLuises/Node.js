const Mentors = require('../models/mentors.model');

async function createMentor (mentorData) {
    const newMentor = await Mentors.create(mentorData);
    return newMentor;
};

async function getAllMentors () {
    const allMentors = await Mentors.find();
    return allMentors;
};

async function getMentorById (id) {
    const mentorById = await Mentors.findById(id);
    return mentorById; 
};

async function deleteMentorById (id) {
    const mentorDeleted = await Mentors.findByIdAndDelete(id);
    return mentorDeleted;
};

async function updateMentorById (id, newData) {
    const mentorUpdated = await Mentors.findByIdAndUpdate(id, newData, {new: true});
    return mentorUpdated;
};

module.exports = {
    createMentor,
    getAllMentors,
    getMentorById,
    deleteMentorById,
    updateMentorById
};