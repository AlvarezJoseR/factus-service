import bcryptUtil from "../utils/bcrypt.util.js";
import jwtUtil from "../utils/jwt.util.js";
import usersRepository from "../repositories/users.repository.js";

const authService = {

    async login(data) {
        try {
            console.log('Datos recibidos en el servicio de login:', data);
            
            // Verificar si el usuario existe
            const userExists = await usersRepository.getUserByEmail(data.email);

            if (userExists.length === 0) {
                return { status: 401, message: "Credenciales inválidas" };
            }

            const user = userExists[0];

            // Verificar si el usuario está activo
            if (!user.active) {
                return { status: 401, message: "Cuenta desactivada" };
            }

            // Verificar si la cuenta está bloqueada
            if (user.locked_until && new Date() < new Date(user.locked_until)) {
                return { status: 423, message: "Cuenta temporalmente bloqueada" };
            }

            // Validar contraseña
            const isPasswordValid = await bcryptUtil.comparePassword(data.password, user.password);

            if (!isPasswordValid) {
                // Incrementar intentos fallidos (esto debería actualizarse en la BD)
                return { status: 401, message: "Credenciales inválidas" };
            }

            // Generar token JWT
            const token = await jwtUtil.sign({
                userId: user.id,
                businessName: user.business_name,
                email: user.email
            });

            // Datos del usuario para la respuesta
            const userData = {
                id: user.id,
                businessName: user.business_name,
                email: user.email,
                phone: user.phone,
                lastLogin: user.last_login
            };

            return { 
                status: 200, 
                message: "Login exitoso", 
                token,
                user: userData
            };

        } catch (error) {
            console.log('Error en auth service:', error);
            throw error;
        }
    }
}

export default authService;