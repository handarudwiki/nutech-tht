import z from "zod";

export default  class TransactionValidation {
    static readonly TOPUP = z.object({
        amount: z.number().min(1000),
    });
}

export type TopupDTO = z.infer<typeof TransactionValidation.TOPUP>;