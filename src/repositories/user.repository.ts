import pool from "../db/db";
import { User, UserResponse } from "../model/user";

export default class UserRepository {
    static async findByEmail(email: string): Promise<User | null> {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0] || null;
    }

    static async create(data: User){
        await pool.query("INSERT INTO users (id,email, password, first_name, last_name, profile_image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [data.id, data.email, data.password, data.first_name, data.last_name, data.profile_image]);
    }

    static async findById(id: string): Promise<UserResponse | null> {
        const result = await pool.query("SELECT email, first_name, last_name, profile_image FROM users WHERE id = $1", [id]);
        return result.rows[0] || null;
    }
}