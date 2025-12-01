import config from "../config/variables.config.js";
import jsonwebtoken from "jsonwebtoken";

const jwtUtil = {
    async sign(payload) {
        const token = await jsonwebtoken.sign(payload, config.JWT_SECRET, {
            expiresIn: `${config.JWT_EXPIRES}h`,
        });
        return token;
    },
    async verify(token) {
        try {
            const decoded = jsonwebtoken.verify(token, config.JWT_SECRET);
            return decoded;
        } catch (error) {
            return {
                error: true,
                message: "Invalid or expired token",
            };
        }
    },
    async signKey(payload, key) {
        const token = await jsonwebtoken.sign(payload, key, {
            expiresIn: `1h`,
        });
        return token;
    },
    async verifyKey(token, key) {
        try {
            const decoded = jsonwebtoken.verify(token, key);
            return decoded;
        } catch (error) {
            return {
                error: true,
                message: "Invalid or expired token",
            };
        }
    },

};

export default jwtUtil;