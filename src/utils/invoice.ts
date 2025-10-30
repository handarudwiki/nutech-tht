export function generateInvoiceNumber(lastInvoiceNumber?: string): string {
    if (!lastInvoiceNumber) {
        return `INV${Date.now()}-001`;
    }

    const invoiceNumber = lastInvoiceNumber.split("-");
    const invoiceId = parseInt(invoiceNumber[1]) + 1;

    const formattedId = invoiceId.toString().padStart(3, '0');

    return `INV${Date.now()}-${formattedId}`;
}
