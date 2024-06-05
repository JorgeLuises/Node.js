const express = require('express');
const genUsecase = require('../usecases/generations.usecase');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', auth, async (request, response) => {
    try {
        const generations = await genUsecase.getAllGenerations();

        response.json({
            success: true,
            data: {generations}
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            error: error.message
        });
    }
});

router.get('/:id', auth, async (request, response) => {
    try {
        const {id} = request.params;
        const generation = await genUsecase.getGenerationById(id);

        response.json({
            success: true,
            data: {generation}
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            error: error.message
        });
    }
});

router.post('/', auth, async (request, response) => {
    try {
        const generationCreated = await genUsecase.createGeneretion(request.body);

        response.json({
            success: true,
            data: {generation: generationCreated}
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            error: error.message
        });
    }
});

router.delete('/:id', auth, async (request, response) => {
    try {
        const {id} = request.params
        const generationDeleted = await genUsecase.deleteGenerationById(id);

        response.json({
            success: true,
            data: {generation: generationDeleted}
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            success: false,
            error: error.message
        });
    }
});

router.patch('/:id', auth, async (request, response) => {
    try {
        const {id} = request.params
        const generationUpdated = await genUsecase.updateGenerationById(id, request.body);

        response.json({
            success: true,
            data: {generation: generationUpdated}
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