import z from "zod";

export default  class TransactionValidation {
    static readonly TOPUP = z.object({
        amount: z.number().min(1000),
    });

    static readonly PAYMENT = z.object({
        service_code: z.string(),
    });

    static readonly FILTER = z.object({
        offset : z.coerce.number().min(0).optional(),
        limit : z.coerce.number().min(1).max(100).optional(),
    });
}

export type TopupDTO = z.infer<typeof TransactionValidation.TOPUP>;
export type PaymentDTO = z.infer<typeof TransactionValidation.PAYMENT>;
export type FilterDTO = z.infer<typeof TransactionValidation.FILTER>;