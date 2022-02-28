import { Payment } from "./payment.model";

export interface Purchase{
    id:string;
    idUser:string;
    date:string;
    hour:string;
    total:number;
    paymentData: Payment;
    image:string;
    products:any[];
    }