const express = require('express');
const kodersUsecase = require('../usecases/koders.usecase');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', auth, async (request, response) => {
    try {
        const koders = await kodersUsecase.getAll();
        
        response.json ({
            success: true,
            data: { koders}
        });
    } catch(error) {
        response.status(error.status || 500);
        response.json( {
            success: false,
            error: error.message
        });
    }
});

router.post('/', async (request, response) => {
    try {
        const koderCreated = await kodersUsecase.create(request.body);
        
        response.json( {
            success: true,
            data: { koder: koderCreated}
        });
    } catch(error) {
        response.status(error.status || 500);
        response.json( {
            success: false,
            error: error.message
        });
    }
});

router.get('/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;
        const koderById = await kodersUsecase.getById(id);
        
        response.json({
            succes: true,
            data: { koderById}
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json( {
            success: false,
            error: error.message
        });
    }
});

router.delete('/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;
        const koderDeleted = await kodersUsecase.deleteById(id);

        response.json({
            success: true,
            data: {koder: koderDeleted}
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json( {
            success: false,
            error: error.message
        });
    }
});

router.patch('/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;
        const koderUpdated = await kodersUsecase.updateById(id, request.body);

        response.json({
            success: true,
            data: {koder: koderUpdated}
        });
    } catch(error) {
        response.status(error.status || 500);
        response.json( {
            success: false,
            error: error.message
        });
    }
}); 

module.exports = router;