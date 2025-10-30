import pool from "../db/db";
import { Service } from "../model/service";

export default class ServiceRepository {
    static async findAll() :Promise<Service[]> {
        const result = await pool.query('SELECT code, name, icon, tarif FROM services');
        return result.rows;
    }
}