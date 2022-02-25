export enum UserRoutes {
    ListProducts = "ListProducts",
    EditProduct = "EditProduct",
}

export type UserStackType = {
    [UserRoutes.ListProducts]: undefined;
    [UserRoutes.EditProduct]: { id: string; title: string; };
};