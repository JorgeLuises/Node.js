const express = require('express');
const mentorsUsecase = require('../usecases/mentors.usecase');

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const mentors = await mentorsUsecase.getAllMentors()

        response.json({
            success: true,
            data: {mentors}
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            error: error.message
        });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const mentor = await mentorsUsecase.getMentorById(id);

        response.json({
            success: true,
            data: {mentor}
        });
    } catch(error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            error: error.message
        });
    }
});

router.post('/', async(request, response) => {
    try {
        const newMentor = await mentorsUsecase.createMentor(request.body);

        response.json({
            success: true,
            data: { mentor: newMentor}
        });
    } catch(error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            error: error.message
        });
    }
});

router.delete('/:id', async(request, response) => {
    try {
        const {id} = request.params;
        const mentorDeleted = await mentorsUsecase.deleteMentorById(id);

        response.json({
            success: true,
            data: {mentor: mentorDeleted}
        });
    } catch(error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            error: error.message
        });
    }
});

router.patch('/:id', async(request, response) => {
    try {
        const {id} = request.params;
        const mentorUpdated = await mentorsUsecase.updateMentorById(id, request.body);

        response.json({
            success: true,
            data: { mentor: mentorUpdated}
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;