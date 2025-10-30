import pool from "../db/db";
import { Service } from "../model/service";

export default class ServiceRepository {
    static async findAll() :Promise<Service[]> {
        const result = await pool.query('SELECT code, name, icon, tarif FROM services');
        return result.rows;
    }

    static async findByCode(code: string) :Promise<Service | null> {
        const result = await pool.query('SELECT code, name, icon, tarif FROM services WHERE code = $1', [code]);
        return result.rows[0] || null;
    }
}