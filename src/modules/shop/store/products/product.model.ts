export interface ProductModel {
    id: string;
    ownerId: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    ownerToken?: string;
}

export interface BasicProduct { 
    id: string; 
    title: string; 
}