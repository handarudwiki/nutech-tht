import { PoolClient } from "pg";
import pool from "../db/db";
import { Transaction } from "../model/transaction";
import { FilterDTO } from "../validations/transaction";

export default class TransactionRepository {
    static async lastTransaction(): Promise<string | null> {
        const result = await pool.query('SELECT invoice_number FROM transactions ORDER BY created_at DESC LIMIT 1');
        return result.rows[0]?.invoice_number || null;
    }

    static async create(client: PoolClient, transaction: Transaction): Promise<void> {
        await client.query('INSERT INTO transactions (id, invoice_number, user_id, type, total_amount, created_at) VALUES ($1, $2, $3, $4, $5, $6)', 
        [transaction.id, transaction.invoice_number, transaction.user_id, transaction.type, transaction.total_amount, transaction.created_at]);
    }

    static async getAllTransaction(userId: string,dto: FilterDTO): Promise<Transaction[]> {
        let query = 'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC';
        const values: any[] = [userId];
        let paramIndex = 2;

        if (dto.offset) {
            query += ` OFFSET $${paramIndex++}`;
            values.push(dto.offset);
        }
        if (dto.limit) {
            query += ` LIMIT $${paramIndex++}`;
            values.push(dto.limit);
        }
        
        const result = await pool.query(query, values);
        return result.rows;
    }
}