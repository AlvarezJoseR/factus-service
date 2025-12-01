import DbConfig from "../config/db.config.js";


const usersRepository = {
    async getUserByEmail(email) {
        try {
            const rows = await DbConfig.exacuteQuery(`SELECT 
                id,
                business_name,
                email,
                phone,
                address,
                password,
                active,
                email_verified,
                email_verification_token,
                password_reset_token,
                password_reset_expires,
                last_login,
                failed_login_attempts,
                locked_until,
                created_at,
                updated_at
            FROM users 
            WHERE email = ? AND active = TRUE
            LIMIT 1`, [email]);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    async createUser(userData) {
        try {
            const result = await DbConfig.exacuteQuery(`
                INSERT INTO users (
                    business_name, 
                    email, 
                    phone, 
                    address, 
                    password,
                    active,
                    email_verified,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `, [
                userData.business_name,
                userData.email,
                userData.phone,
                userData.address,
                userData.password,
                userData.active || true,
                userData.email_verified || false
            ]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default usersRepository;