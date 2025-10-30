import pool from "../db/db";
import { User, UserResponse } from "../model/user";
import { UpdateDTO } from "../validations/user";

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

     static async update(id: string, data: UpdateDTO): Promise<UserResponse | null> {
        const fields = [];
        const values: any[] = [];
        let paramIndex = 1;

        if (data.first_name) {
            fields.push(`first_name = $${++paramIndex}`);
            values.push(data.first_name);
        }

        if (data.last_name) {
            fields.push(`last_name = $${++paramIndex}`);
            values.push(data.last_name);
        }

        if (fields.length === 0)  return null;

        const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $1`;
        const {rows}= await pool.query(query, [id, ...values]);
        return  rows[0] || null;
    }

    static async updateProfileImage(id: string, profileImagePath: string): Promise<UserResponse | null> {
        const result = await pool.query("UPDATE users SET profile_image = $1 WHERE id = $2 RETURNING email, first_name, last_name, profile_image", [profileImagePath, id]);
        return result.rows[0] || null;
    }   
}
