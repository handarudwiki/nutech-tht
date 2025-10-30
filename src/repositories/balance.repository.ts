import { PoolClient } from "pg";
import pool from "../db/db";
import { v7 as uuid } from "uuid"

export default class BalanceRepository {
    static async updateBalance(client:PoolClient, userId: string, amount: number): Promise<number> {
        const balance = await client.query('SELECT balance FROM wallets WHERE user_id = $1 ', [userId]);
        if (balance.rows.length === 0) {
            const newBalance = await client.query('INSERT INTO wallets (id, user_id, balance) VALUES ($1, $2, $3) returning balance', [uuid(), userId, amount]);
            return newBalance.rows[0].balance;
        } else {
            const newBalance = await client.query('UPDATE wallets SET balance = $1 WHERE user_id = $2 returning balance', [balance.rows[0].balance + amount, userId]);
            return newBalance.rows[0].balance;
        }
    }

    static async getBalance(userId: string): Promise<number> {
        const balance = await pool.query('SELECT balance FROM wallets WHERE user_id = $1', [userId]);
        if (balance.rows.length === 0) {
            return 0;
        }
        return balance.rows[0].balance;
    }
}

