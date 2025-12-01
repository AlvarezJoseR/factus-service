import bcryptUtil from "../utils/bcrypt.util.js";
import jwtUtil from "../utils/jwt.util.js";
import usersRepository from "../repositories/users.repository.js";

const usersService = {

    async register(data) {
        try {
            console.log('Datos recibidos en el servicio de registro:', data);
            
            // Validar datos requeridos
            if (!data.email || !data.password || !data.business_name) {
                return { status: 400, message: "Email, password y nombre de negocio son requeridos" };
            }

            // Verificar si el email ya existe
            const emailExists = await usersRepository.getUserByEmail(data.email);
            if (emailExists.length > 0) {
                return { status: 409, message: "El email ya está registrado" };
            }

            // Hashear la contraseña
            const hashedPassword = await bcryptUtil.hashPassword(data.password);

            // Preparar datos del usuario
            const userData = {
                business_name: data.business_name,
                email: data.email.toLowerCase(),
                phone: data.phone || null,
                address: data.address || null,
                password: hashedPassword,
                active: true,
                email_verified: false
            };

            // Crear usuario
            const result = await usersRepository.createUser(userData);

            // Generar token JWT para el nuevo usuario
            const token = await jwtUtil.sign({
                userId: result.insertId,
                businessName: userData.business_name,
                email: userData.email
            });

            // Datos del usuario para la respuesta
            const userData_response = {
                id: result.insertId,
                businessName: userData.business_name,
                email: userData.email,
                phone: userData.phone
            };

            return { 
                status: 201, 
                message: "Usuario registrado exitosamente", 
                token,
                user: userData_response
            };

        } catch (error) {
            console.log('Error en users service registro:', error);
            throw error;
        }
    }
};

export default usersService;