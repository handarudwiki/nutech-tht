import { TransactionType } from "../constant/transaction";

export interface Transaction {
    id: string;
    invoice_number: string;
    user_id: string;
    type: TransactionType;
    total_amount: number;
    created_at: Date;
}

export interface TransactionResponse {
    invoice_number: string;
    type: TransactionType;
    total_amount: number;
    description: string;
    created_at: Date;
}