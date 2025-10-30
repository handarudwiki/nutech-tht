import z from "zod";

export default  class TransactionValidation {
    static readonly TOPUP = z.object({
        amount: z.number().min(1000),
    });

    static readonly PAYMENT = z.object({
        service_code: z.string(),
    });
}

export type TopupDTO = z.infer<typeof TransactionValidation.TOPUP>;
export type PaymentDTO = z.infer<typeof TransactionValidation.PAYMENT>;