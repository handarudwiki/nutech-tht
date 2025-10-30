import pool from "../db/db";
import { Banner } from "../model/banner";

export default class BannerRepository {
    static async findAll() :Promise<Banner[]> {
        const result = await pool.query('SELECT name, image, description FROM banners');
        return result.rows;
    }
}