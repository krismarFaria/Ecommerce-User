export interface Payment {
    name: string;
    cardNumber: string;
    expireDate: string;
    cvv: string;
    amountReceive: number;
    change: number;
}