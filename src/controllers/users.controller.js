import usersService from '../services/users.service.js';

const usersController = {
    async register(req, res) {
        try {
            const response = await usersService.register(req.body);
            return res.status(response.status).json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    }
};

export default usersController;