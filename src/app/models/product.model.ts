export interface Product{
    quantity: number;
    id:string;
    name:string;
    image:string;
    price:number;
    description:string;
    stock:number;
    idUser?: string;
}