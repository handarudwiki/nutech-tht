import { TransactionType } from "../constant/transaction";
import pool from "../db/db";
import { Transaction } from "../model/transaction";
import BalanceRepository from "../repositories/balance.repository";
import TransactionRepository from "../repositories/transaction.repository";
import { generateInvoiceNumber } from "../utils/invoice";
import TransactionValidation, { TopupDTO } from "../validations/transaction";
import Validation from "../validations/validation";

export default class TransactionService {
    static async getBalance(userId: string): Promise<{balance: number}> {
        const balance = await BalanceRepository.getBalance(userId);
        return {
            balance: balance
        };
    }   

    static async topUp(dto:TopupDTO, userId: string): Promise<{balance: number}> {
        const client = await pool.connect();
        try {
            const validData = Validation.validate(TransactionValidation.TOPUP, dto);
            await client.query('BEGIN');

            const balance = await BalanceRepository.updateBalance(client, userId, validData.amount);
            const lastInvoiceNumber = await TransactionRepository.lastTransaction() 
            const transaction:Transaction = {
                id: crypto.randomUUID(),
                invoice_number: lastInvoiceNumber?  generateInvoiceNumber(lastInvoiceNumber) : generateInvoiceNumber(),
                user_id: userId,
                total_amount: validData.amount,
                type: TransactionType.TOPUP,
                created_at: new Date(),
            }

            await TransactionRepository.create(client, transaction);
            await client.query('COMMIT');
            return {
                balance: balance
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}