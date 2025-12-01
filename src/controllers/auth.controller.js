import authService from '../services/auth.service.js';

const authController = {
    async login(req, res) {
        try {
            const response = await authService.login(req.body);
            return res.status(response.status).json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    }
};

export default authController;