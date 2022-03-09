export interface CartItemModel {
    id: string;
    title: string;
    price: number;
    amount: number;
    sum: number;
    ownerToken?: string;
}
