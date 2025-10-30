import { TransactionType } from "../constant/transaction";
import pool from "../db/db";
import BadRequestException from "../error/bad_request_exception";
import { Transaction } from "../model/transaction";
import BalanceRepository from "../repositories/balance.repository";
import ServiceRepository from "../repositories/service.repository";
import TransactionRepository from "../repositories/transaction.repository";
import { generateInvoiceNumber } from "../utils/invoice";
import TransactionValidation, { PaymentDTO, TopupDTO } from "../validations/transaction";
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

    static async payment(userId: string, dto:PaymentDTO): Promise<{}> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const validData = Validation.validate(TransactionValidation.PAYMENT, dto);

            const service = await ServiceRepository.findByCode(validData.service_code);
            if(!service){
                throw new BadRequestException("Service not found");
            }

            const balance = await BalanceRepository.getBalance(userId);
            if(balance < service.tarif){
                throw new BadRequestException("Insufficient balance");
            }

            await BalanceRepository.updateBalance(client, userId, -service.tarif);
            const lastInvoiceNumber = await TransactionRepository.lastTransaction() 
            const transaction:Transaction = {
                id: crypto.randomUUID(),
                invoice_number: lastInvoiceNumber?  generateInvoiceNumber(lastInvoiceNumber) : generateInvoiceNumber(),
                user_id: userId,
                total_amount: service.tarif,
                type: TransactionType.PAYMENT,
                created_at: new Date(),
            }

            await TransactionRepository.create(client, transaction);
            await client.query('COMMIT');
            return {
                invoice_number: transaction.invoice_number,
                service_code: validData.service_code,   
                service_name: service.name,
                transaction_type: transaction.type,
                total_amount: transaction.total_amount,
                created_at: transaction.created_at,
            }
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}